// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     return cb(null, "../public/images");
//   },
//   filename: function (req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
module.exports = { upload };
