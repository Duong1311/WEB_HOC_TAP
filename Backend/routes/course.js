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

//delete chapter
router.delete("/deleteChapter/:id", courseController.deleteChapter);

//update chapter
router.put("/updateChapter/:id", courseController.updateChapter);

//add category
router.post("/createCategory", courseController.createCategory);
router.get("/getAllCategory", courseController.getAllCategory);

module.exports = router;
