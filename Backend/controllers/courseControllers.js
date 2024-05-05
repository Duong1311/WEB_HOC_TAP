const { StatusCodes } = require("http-status-codes");
const courseService = require("../services/courseService");
const courseController = {
  createCategory: async (req, res, next) => {
    try {
      const createCategory = await courseService.createCategory(req.body);
      res.status(StatusCodes.OK).json(createCategory);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createCategory);
    }
  },
  getAllCategory: async (req, res, next) => {
    try {
      const categorys = await courseService.getAllCategory();

      res.status(StatusCodes.OK).json(categorys);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(category);
    }
  },
  createNewCourse: async (req, res, next) => {
    try {
      const createNewCourse = await courseService.createNewCourse(req.body);
      res.status(StatusCodes.OK).json(createNewCourse);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createNewCourse);
    }
  },
  getAllCourseCreate: async (req, res, next) => {
    try {
      const courseDetails = await courseService.getAllCourseCreate(
        req.params.id
      );
      res.status(StatusCodes.OK).json(courseDetails);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(courseDetails);
    }
  },
  getCourseCreateById: async (req, res, next) => {
    try {
      const courseDetails = await courseService.getCourseCreateById(
        req.params.id
      );
      res.status(StatusCodes.OK).json(courseDetails);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(courseDetails);
    }
  },
};
module.exports = courseController;
