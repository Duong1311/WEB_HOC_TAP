const { StatusCodes } = require("http-status-codes");
const openaiService = require("../services/openaiService");

const openaiController = {
  getOpenAiQuestions: async (req, res, next) => {
    try {
      const resResults = await openaiService.getOpenAiQuestions(req.body);
      res.status(StatusCodes.CREATED).json(resResults);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
      console.log(error);
    }
  },
};
module.exports = openaiController;
