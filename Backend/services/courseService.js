// const { StatusCodes } = require("http-status-codes");
const Course = require("../models/courseModel");
const Chapter = require("../models/chapterModel");
const Category = require("../models/categoryModel");
const courseService = {
  createCategory: async (data) => {
    try {
      const newCategory = await new Category({
        categoryName: data.categoryName,
      });
      //save to database
      const category = await newCategory.save();
      return category;
    } catch (error) {
      throw error;
    }
  },
  getAllCategory: async () => {
    try {
      const categorys = await Category.find();
      const categoryList = categorys.map((category) => {
        category.categoryName, category._id;
      });
      // return categoryList;
      return categorys;
    } catch (error) {
      throw error;
    }
  },
  createNewCourse: async (data) => {
    try {
      const newCourse = await new Course({
        userId: data.userId,
        title: data.title,
        categoryId: data.categoryId,
      });
      //save to database
      const course = await newCourse.save();
      return course;
    } catch (error) {
      throw error;
    }
  },
  getAllCourseCreate: async (id) => {
    try {
      const courseDetails = await Course.find({ userId: id });
      return courseDetails;
    } catch (error) {
      throw error;
    }
  },
  getCourseCreateById: async (id) => {
    try {
      //co course id tim chapter
      const chapters = await Chapter.findById({ courseId: id });
      return course;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = courseService;
