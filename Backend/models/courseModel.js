const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      require: true,
    },
    chapterOrderIds: [{ type: mongoose.SchemaTypes.ObjectId }],
    title: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
    },
    entityMap: {
      type: mongoose.SchemaTypes.Mixed,
    },
    blocks: {
      type: mongoose.SchemaTypes.Mixed,
    },
    public: {
      type: Boolean,
      default: false,
    },
    categoryId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "categories",
      // require: true,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    studyCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
// courseSchema.index({ title: "text", "blocks.text": "text" });
courseSchema.index({ title: "text" });

// const UserModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("courses", courseSchema);
// module.exports = UserModel;
