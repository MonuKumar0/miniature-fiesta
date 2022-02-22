import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
    validate: {
      validator(val) {
        return val.length <= 255
      },
      message: 'post length should be less than 256',
    },
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
