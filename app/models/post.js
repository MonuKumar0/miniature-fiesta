import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
   user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
