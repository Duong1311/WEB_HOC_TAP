const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const courseValidation = {
  createNewCourse: async (req, res, next) => {
    const correctSchema = Joi.object({
      title: Joi.string().required().max(255).trim().strict(),
      userId: Joi.string().required().max(255).trim().strict(),
    });
    try {
      //abortEarly: return tat ca loi
      await correctSchema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      console.log(error);
      res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: new Error(error).message });
    }
  },
};

module.exports = courseValidation;
