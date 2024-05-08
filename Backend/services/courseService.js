// const { StatusCodes } = require("http-status-codes");
const Courses = require("../models/courseModel");
const Chapters = require("../models/chapterModel");
const Lessons = require("../models/lessonModel");
const Category = require("../models/categoryModel");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { cloneDeep } = require("lodash");

const courseService = {
  createLessonContent: async (id, data) => {
    try {
      //find lesson and update
      const lesson = await Lessons.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            entityMap: data.entityMap,
            blocks: data.blocks,
          },
        },
        {
          returnDocument: "after",
        }
      );
      return { message: "Cập nhật bài học thành công" };
    } catch (error) {
      throw error;
    }
  },
  getLessonContent: async (id) => {
    try {
      const lessonContent = await Lessons.findOne({ _id: id });
      return lessonContent;
    } catch (error) {
      throw error;
    }
  },
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
            // _id: new ObjectId(id),
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
        courseId: mongoose.Types.ObjectId.createFromHexString(data.courseId),
        title: data.title,
      });
      //save to database
      const chapter = await newChapter.save();
      if (chapter) {
        chapter.lessons = [];
        //update chapterOrderIds in course
        await Courses.findOneAndUpdate(
          { _id: data.courseId },
          {
            $push: {
              chapterOrderIds: new ObjectId(chapter._id),
            },
          },
          {
            returnDocument: "after",
          }
        );
      }

      return chapter;
    } catch (error) {
      throw error;
    }
  },
  createLesson: async (data) => {
    try {
      const newLesson = await new Lessons({
        courseId: mongoose.Types.ObjectId.createFromHexString(data.courseId),
        chapterId: mongoose.Types.ObjectId.createFromHexString(data.chapterId),
        title: data.title,
      });
      //save to database
      const lesson = await newLesson.save();
      if (lesson) {
        //update lessonOrderIds in chapter
        await Chapters.findOneAndUpdate(
          { _id: data.chapterId },
          {
            $push: {
              lessonOrderIds: new ObjectId(lesson._id),
            },
          },
          {
            returnDocument: "after",
          }
        );
      }
      return lesson;
    } catch (error) {
      throw error;
    }
  },
  moveChapter: async (id, updateData) => {
    try {
      const update = {
        ...updateData,
      };

      // console.log(update);
      const result = await Courses.findOneAndUpdate(
        { _id: id },
        {
          $set: update,
        },
        {
          returnDocument: "after",
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  moveLessonInOneChapter: async (id, updateData) => {
    try {
      const update = {
        ...updateData,
      };

      // console.log(update);
      const result = await Chapters.findOneAndUpdate(
        { _id: id },
        {
          $set: update,
        },
        {
          returnDocument: "after",
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  },
  deleteChapter: async (id) => {
    try {
      //delete chapterOrderIds in course
      const chapterDelete = await Chapters.findOne({
        _id: id,
      });
      console.log(chapterDelete);
      if (!chapterDelete) {
        return { message: "Không tìm thấy chương" };
      }
      const res = await Courses.findOneAndUpdate(
        { _id: chapterDelete.courseId },
        {
          $pull: {
            chapterOrderIds: new ObjectId(id),
          },
        },
        {
          returnDocument: "after",
        }
      );
      console.log(res);
      //delete chapter
      await Chapters.deleteOne({ _id: id });

      //delete all lessons in chapter
      await Lessons.deleteMany({ chapterId: id });

      return { message: "Xóa chương thành công " };
    } catch (error) {
      throw error;
    }
  },
  updateChapter: async (id, updateData) => {
    try {
      const update = {
        ...updateData,
      };

      // console.log(update);
      const result = await Chapters.findOneAndUpdate(
        { _id: id },
        {
          $set: update,
        },
        {
          returnDocument: "after",
        }
      );
      return { result: result, message: "Cập nhật chương thành công" };
    } catch (error) {
      throw error;
    }
  },
};
module.exports = courseService;
