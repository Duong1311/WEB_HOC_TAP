const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "lessons",
      require: true,
    },
    question: {
      type: String,
    },
    answers: {
      type: Array,
    },
    correct: {
      type: Number,
    },
    explanation: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("questions", questionSchema);
