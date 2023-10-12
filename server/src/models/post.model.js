const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    imageurl: { type: Array, unique: true, trim: true, required: true },
    caption: { type: String, trim: true, required: true },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: [] },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },
        body: { type: String, trim: true, required: true },
        createdAt: { type: Date, required: true },
      },
    ],
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.methods.toJSON = function () {
  const post = this;
  const postObject = post.toObject();
  delete postObject.updatedAt;
  delete postObject.__v;

  return postObject;
};

const Post = mongoose.model('posts', postSchema);
module.exports = Post;
