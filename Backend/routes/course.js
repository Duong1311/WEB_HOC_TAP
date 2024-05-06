const express = require("express");
const router = express.Router();
const courseValidation = require("../validations/courseValidation");
const courseController = require("../controllers/courseControllers");
router.post(
  "/createCourse",
  // courseValidation.createNewCourse,
  courseController.createNewCourse
);
router.get("/AllCourseDetails/:id", courseController.getAllCourseCreate);
router.get("/CourseDetails/:id", courseController.getCourseCreateById);

//add chapter, lesson
router.post("/createChapter", courseController.createChapter);
router.post("/createLesson", courseController.createLesson);

//add category
router.post("/createCategory", courseController.createCategory);
router.get("/getAllCategory", courseController.getAllCategory);

module.exports = router;
