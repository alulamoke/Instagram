const mongoose = require('mongoose');

const storySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    type: { type: String, enum: ['image', 'video'], required: true },
    caption: { type: String, trim: true },
    url: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

storySchema.methods.toJSON = function () {
  const story = this;
  const storyObject = story.toObject();
  delete storyObject.updatedAt;
  delete storyObject.__v;

  return storyObject;
};

const Story = mongoose.model('stories', storySchema);
module.exports = Story;
