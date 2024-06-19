const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      unique: true,
    },
    imageId: {
      type: String,
    },
    password: {
      type: String,
      // required: true,
      minLength: 6,
    },
    description: {
      type: String,
      maxLength: 100,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
    authSource: {
      type: String,
      enum: ["self", "google"],
      default: "self",
    },
  },
  { timestamps: true }
);

userSchema.index({ username: "text", email: "text" });
// const UserModel = mongoose.model("User", userSchema);

module.exports = mongoose.model("Users", userSchema);
// module.exports = UserModel;
