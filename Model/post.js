const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postImage: {
    type: String
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: String
  }],
  description: {
    type: String
  }
});

module.exports = mongoose.model("Posts", postSchema);
