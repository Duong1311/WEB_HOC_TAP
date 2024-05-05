const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "courses",
      require: true,
    },
    lessonOrderIds: [{ type: mongoose.SchemaTypes.ObjectId }],
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("chapters", chapterSchema);
// module.exports = UserModel;
