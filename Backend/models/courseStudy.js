const mongoose = require("mongoose");

const courseStudySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("couserStudys", courseStudySchema);
