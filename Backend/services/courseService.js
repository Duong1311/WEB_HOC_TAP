// const { StatusCodes } = require("http-status-codes");
const Courses = require("../models/courseModel");
const Chapters = require("../models/chapterModel");
const Lessons = require("../models/lessonModel");
const Category = require("../models/categoryModel");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { cloneDeep, forEach, create } = require("lodash");

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

      // return categoryList;
      return categorys;
    } catch (error) {
      throw error;
    }
  },
  createNewCourse: async (data) => {
    try {
      const newCourse = await new Courses({
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
      const courseDetails = await Courses.find({ userId: id }).populate(
        "categoryId"
      );
      return courseDetails;
    } catch (error) {
      throw error;
    }
  },
  getCourseCreateById: async (id) => {
    try {
      const result = await Courses.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId.createFromHexString(id),
          },
        },
        {
          $lookup: {
            from: "chapters",
            localField: "_id",
            foreignField: "courseId",
            as: "chapters",
          },
        },
        {
          $lookup: {
            from: "lessons",
            localField: "_id",
            foreignField: "courseId",
            as: "lessons",
          },
        },
      ]);
      // console.log(result[0]);
      const resResults = cloneDeep(result[0]);
      resResults.chapters.forEach((chapter) => {
        chapter.lessons = resResults.lessons.filter((lesson) =>
          lesson.chapterId.equals(chapter._id)
        );
      });
      delete resResults.lessons;
      // console.log(result);
      return resResults;
    } catch (error) {
      throw error;
    }
  },
  createChapter: async (data) => {
    try {
      const newChapter = await new Chapters({
        courseId: data.courseId,
        title: data.title,
      });

      //save to database
      const chapter = await newChapter.save();
      return chapter;
    } catch (error) {
      throw error;
    }
  },
  createLesson: async (data) => {
    try {
      const newLesson = await new Lessons({
        courseId: data.courseId,
        chapterId: data.chapterId,
        title: data.title,
      });
      //save to database
      const lesson = await newLesson.save();
      return lesson;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = courseService;
