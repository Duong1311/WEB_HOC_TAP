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
    entityMap: {
      type: mongoose.SchemaTypes.Mixed,
    },
    blocks: {
      type: mongoose.SchemaTypes.Mixed,
    },
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("lessons", lessonSchema);
// module.exports = UserModel;
