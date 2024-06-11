const { StatusCodes } = require("http-status-codes");
const courseService = require("../services/courseService");

const courseController = {
  searchGv: async (req, res, next) => {
    try {
      const searchGv = await courseService.searchGv(req.query);
      res.status(StatusCodes.OK).json(searchGv);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  searchCourse: async (req, res, next) => {
    try {
      const searchCourse = await courseService.searchCourse(req.query);
      res.status(StatusCodes.OK).json(searchCourse);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  deleteCourse: async (req, res, next) => {
    try {
      const deleteCourse = await courseService.deleteCourse(req.params.id);
      res.status(StatusCodes.OK).json(deleteCourse);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getRatingByCourseId: async (req, res, next) => {
    try {
      const rating = await courseService.getRatingByCourseId(req.params.id);
      res.status(StatusCodes.OK).json(rating);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  createRating: async (req, res, next) => {
    try {
      const createRating = await courseService.createRating(req.body);
      res.status(StatusCodes.CREATED).json(createRating);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getAllCourses: async (req, res, next) => {
    try {
      const courses = await courseService.getAllCourses();
      res.status(StatusCodes.OK).json(courses);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getCourseDetail: async (req, res, next) => {
    try {
      const courseDetails = await courseService.getCourseDetail(req.params.id);
      res.status(StatusCodes.OK).json(courseDetails);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  createCourseImage: async (req, res, next) => {
    try {
      const createCourseImage = await courseService.createCourseImage(req.file);
      res.status(StatusCodes.CREATED).json(createCourseImage);
      // res.status(StatusCodes.CREATED).json("thanh cong");
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },

  createCourseDetail: async (req, res, next) => {
    try {
      const createCourseDetail = await courseService.createCourseDetail(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.CREATED).json(createCourseDetail);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  publicCourse: async (req, res, next) => {
    try {
      const publicCourse = await courseService.publicCourse(req.params.id);
      res.status(StatusCodes.OK).json(publicCourse);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  deleteLesson: async (req, res, next) => {
    try {
      const deleteLesson = await courseService.deleteLesson(req.params.id);
      res.status(StatusCodes.OK).json(deleteLesson);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  deleteQuestion: async (req, res, next) => {
    try {
      const deleteQuestion = await courseService.deleteQuestion(req.params.id);
      res.status(StatusCodes.OK).json(deleteQuestion);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  createLessonQuestions: async (req, res, next) => {
    try {
      const createLessonQuestions = await courseService.createLessonQuestions(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.CREATED).json(createLessonQuestions);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getLessonQuestions: async (req, res, next) => {
    try {
      const lessonQuestions = await courseService.getLessonQuestions(
        req.params.id
      );
      res.status(StatusCodes.OK).json(lessonQuestions);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  createLessonContent: async (req, res, next) => {
    try {
      const createLessonContent = await courseService.createLessonContent(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.CREATED).json(createLessonContent);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  createCategory: async (req, res, next) => {
    try {
      const createCategory = await courseService.createCategory(req.body);
      res.status(StatusCodes.CREATED).json(createCategory);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getAllCategory: async (req, res, next) => {
    try {
      const categorys = await courseService.getAllCategory();

      res.status(StatusCodes.OK).json(categorys);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  createNewCourse: async (req, res, next) => {
    try {
      const createNewCourse = await courseService.createNewCourse(req.body);
      res.status(StatusCodes.CREATED).json(createNewCourse);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getAllCourseCreate: async (req, res, next) => {
    try {
      const courseDetails = await courseService.getAllCourseCreate(
        req.params.id
      );
      res.status(StatusCodes.OK).json(courseDetails);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getCourseCreateById: async (req, res, next) => {
    try {
      const courseDetails = await courseService.getCourseCreateById(
        req.params.id
      );

      res.status(StatusCodes.OK).json(courseDetails);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  createChapter: async (req, res, next) => {
    try {
      const createChapter = await courseService.createChapter(req.body);
      res.status(StatusCodes.CREATED).json(createChapter);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
      console.log(error);
    }
  },
  createLesson: async (req, res, next) => {
    try {
      const createLesson = await courseService.createLesson(req.body);
      res.status(StatusCodes.CREATED).json(createLesson);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  moveChapter: async (req, res, next) => {
    try {
      const moveChapter = await courseService.moveChapter(
        req.params.id,
        req.body
      );

      res.status(StatusCodes.OK).json(moveChapter);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  moveLessonInOneChapter: async (req, res, next) => {
    try {
      const moveLessonInOneChapter = await courseService.moveLessonInOneChapter(
        req.params.id,
        req.body
      );

      res.status(StatusCodes.OK).json(moveLessonInOneChapter);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  deleteChapter: async (req, res, next) => {
    try {
      const deleteChapter = await courseService.deleteChapter(req.params.id);
      res.status(StatusCodes.OK).json(deleteChapter);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  updateChapter: async (req, res, next) => {
    try {
      const updateChapter = await courseService.updateChapter(
        req.params.id,
        req.body
      );

      res.status(StatusCodes.OK).json(updateChapter);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getLessonContent: async (req, res, next) => {
    try {
      const lessonContent = await courseService.getLessonContent(req.params.id);
      res.status(StatusCodes.OK).json(lessonContent);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
};
module.exports = courseController;
