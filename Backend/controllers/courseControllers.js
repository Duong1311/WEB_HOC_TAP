const { StatusCodes } = require("http-status-codes");
const courseService = require("../services/courseService");
const courseController = {
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
};
module.exports = courseController;
