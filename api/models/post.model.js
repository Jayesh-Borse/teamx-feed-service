const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    tags: {
      type: Array,
      default: [],
    },
    img: {
      type: String,
    },
    likes: [{
      type: String
    }],
    comments: [{
        userId: {
            type: String,
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);