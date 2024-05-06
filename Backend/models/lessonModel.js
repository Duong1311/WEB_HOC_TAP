const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    chapterId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "chapters",
      require: true,
    },
    courseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "courses",
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    text: {
      type: String,
    },
    pdf: {
      type: String,
    },
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("lessons", lessonSchema);
// module.exports = UserModel;
