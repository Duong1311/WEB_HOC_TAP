const userService = require("../services/userService");
const { StatusCodes } = require("http-status-codes");

const userControllers = {
  blockUser: async (req, res, next) => {
    try {
      const blockUser = await userService.blockUser(req.params.id);
      res.status(StatusCodes.OK).json(blockUser);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getAllUser: async (req, res, next) => {
    try {
      const allUser = await userService.getAllUser();
      res.status(StatusCodes.OK).json(allUser);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  addCourseToHistory: async (req, res, next) => {
    try {
      const addCourseToHistory = await userService.addCourseToHistory(
        req.body.userId,
        req.body.courseId
      );
      res.status(StatusCodes.OK).json(addCourseToHistory);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getAllCourseStudys: async (req, res, next) => {
    try {
      console.log(req.params.id);
      const courseStudys = await userService.getAllCourseStudys(req.params.id);
      res.status(StatusCodes.OK).json(courseStudys);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  updateUserPassword: async (req, res, next) => {
    try {
      const updateUserPassword = await userService.updateUserPassword(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(updateUserPassword);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  getUserInfor: async (req, res, next) => {
    try {
      const user = await userService.getUserInfor(req.params.id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
  updateUserInfor: async (req, res, next) => {
    try {
      const updateUserInfor = await userService.updateUserInfor(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(updateUserInfor);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  },
};

module.exports = userControllers;
