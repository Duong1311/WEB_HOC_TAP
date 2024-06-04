const middleware = require("../middleware");
const userControllers = require("../controllers/userControllers");
// const user = require("../model/user");

const router = require("express").Router();

//get user infor
router.get("/getUserInfor/:id", userControllers.getUserInfor);
//update user infor
router.put("/updateUserInfor/:id", userControllers.updateUserInfor);
//update user password
router.put("/updateUserPassword/:id", userControllers.updateUserPassword);
//get all course studys
router.get("/getAllCourseStudys/:id", userControllers.getAllCourseStudys);
//add course to history
router.post("/addCourseToHistory", userControllers.addCourseToHistory);
//get all user
router.get("/getAllUser", userControllers.getAllUser);
//block user
router.put("/blockUser/:id", userControllers.blockUser);
module.exports = router;
