import Post from '../models/post.js';
import mongoose from 'mongoose'
const { isValidObjectId } = mongoose;

class PostController {
  async populate(req, res, next) {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      const err = new Error("Invalid post id");
      err.status = 400;
      return next(err);
    }
    try {
      const post = await Post.findById(id);

      if (!post) {
        const err = new Error('Post not found.');
        err.status = 404;
        return next(err);
      }

      req.post = post;
      next();
    } catch (err) {
      next(err);
    }
  }

  async search(req, res, next) {
    try {
      const {
        page = 1
      } = req.query;
      const LIMIT = 10;
      const skip = (page - 1) * LIMIT;
      const posts = await Post.find({}).skip(skip).limit(LIMIT);
      res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {

    const post = new Post({
      ...req.body,
      user: req.currentUser._id,
    });

    try {
      res.status(201).json(await post.save());
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      await req.post.remove();
      return res.sendStatus(204);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const {
        text
      } = req.body;
      const {
        id
      } = req.params;
      if (!isValidObjectId(id)) {
        const err = new Error("Invalid post id");
        err.status = 400;
        return next(err);
      }
      const data = await Post.findOneAndUpdate({ _id: id }, { $set: { text } }, { new: true });
      if (!data) {
        const err = new Error("Post not found");
        err.status = 404
        return next(err);
      }
      res.status(200).json(data)
    }
    catch (err) {
      next(err)
    }
  }
}

export default new PostController();
