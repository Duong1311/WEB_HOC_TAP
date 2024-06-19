const express = require("express");
const router = express.Router();
const courseValidation = require("../validations/courseValidation");
const courseController = require("../controllers/courseControllers");
const multer = require("multer");
// const { upload } = require("../utils/multerStore");
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload1 = multer({ storage1 });

router.post(
  "/createCourse",
  // courseValidation.createNewCourse,
  courseController.createNewCourse
);
//delete course by id
router.delete("/deleteCourse/:id", courseController.deleteCourse);
//get all courses
router.get("/getAllCourses", courseController.getAllCourses);
//get course detail
router.get("/getCourseDetail/:id", courseController.getCourseDetail);
//update course detail
router.post("/createCourseDetail/:id", courseController.createCourseDetail);
// create course image
router.post(
  "/createCourseImage",
  upload1.single("file"),
  courseController.createCourseImage
);

//update course public
router.put("/publicCourse/:id", courseController.publicCourse);
//get all course created by user
router.get("/AllCourseDetails/:id", courseController.getAllCourseCreate);
//get course created by id
router.get("/CourseDetails/:id", courseController.getCourseCreateById);

//move chapter, lesson
router.put("/moveChapter/:id", courseController.moveChapter);
router.put("/moveLessonOne/:id", courseController.moveLessonInOneChapter);

//add chapter, lesson
router.post("/createChapter", courseController.createChapter);
router.post("/createLesson", courseController.createLesson);

//get lesson content
router.get("/getLessonContent/:id", courseController.getLessonContent);

//get lesson questions
router.get("/getLessonQuestions/:id", courseController.getLessonQuestions);

//create lesson questions
router.post(
  "/createLessonQuestions/:id",
  courseController.createLessonQuestions
);
//delete lesson question
router.delete("/deleteQuestion/:id", courseController.deleteQuestion);
//delete lesson
router.delete("/deleteLesson/:id", courseController.deleteLesson);
//update lesson content
router.post("/createLessonContent/:id", courseController.createLessonContent);
//update leson title
router.post("/updateLessonTitle/:id", courseController.updateLessonTitle);
//delete chapter
router.delete("/deleteChapter/:id", courseController.deleteChapter);

//update chapter
router.put("/updateChapter/:id", courseController.updateChapter);

//add category
router.post("/createCategory", courseController.createCategory);
router.get("/getAllCategory", courseController.getAllCategory);

//rating
router.post("/createRating", courseController.createRating);
router.get("/getRatingByCourseId/:id", courseController.getRatingByCourseId);
// search by course title
router.get("/searchCourse", courseController.searchCourse);
//search course gvhome by title
router.get("/searchGv", courseController.searchGv);
module.exports = router;
