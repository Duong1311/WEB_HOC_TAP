// const middleware = require("../middleware");
const userControllers = require("../controllers/userControllers");
// const user = require("../model/user");
const multer = require("multer");
const storage1 = multer.memoryStorage({
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload1 = multer({ storage1 });

const router = require("express").Router();

//get user infor
router.get("/getUserInfor/:id", userControllers.getUserInfor);
//update user infor
router.put("/updateUserInfor/:id", userControllers.updateUserInfor);
//update user password
router.put("/updateUserPassword/:id", userControllers.updateUserPassword);
//get all course studys
router.get("/getAllCourseStudys/:id", userControllers.getAllCourseStudys);
//delete course history
router.delete("/deleteCourseHistory/:id", userControllers.deleteCourseHistory);
//add course to history
router.post("/addCourseToHistory", userControllers.addCourseToHistory);
//get all user
router.get("/getAllUser", userControllers.getAllUser);
//block user
router.put("/blockUser/:id", userControllers.blockUser);
//send recovery email
router.post("/send_recovery_email", userControllers.send_recovery_email);
//recover password
router.put("/recover_password", userControllers.recover_password);
//update avatar
router.post("/avatar", upload1.single("file"), userControllers.avatar);
module.exports = router;
