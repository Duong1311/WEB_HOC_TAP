const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      require: true,
    },
    courseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "courses",
      require: true,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ratings", ratingSchema);
