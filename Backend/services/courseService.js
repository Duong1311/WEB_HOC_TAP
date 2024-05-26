// const { StatusCodes } = require("http-status-codes");
const Courses = require("../models/courseModel");
const Chapters = require("../models/chapterModel");
const Lessons = require("../models/lessonModel");
const Category = require("../models/categoryModel");
const Questions = require("../models/questionModel");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { cloneDeep } = require("lodash");
const upload = require("../utils/multerStore");
const courseService = {
  getAllCourses: async () => {
    try {
      const courses = await Courses.find().populate("userId");
      return courses;
    } catch (error) {
      throw error;
    }
  },
  getCourseDetail: async (id) => {
    try {
      const courseDetails = await Courses.findOne({ _id: id }).populate(
        "categoryId"
      );
      // console.log(courseDetails);
      return courseDetails;
    } catch (error) {
      throw error;
    }
  },
  createCourseImage: async (data) => {
    try {
      console.log(data);

      return { message: "Tải ảnh lên thành công" };
    } catch (error) {
      throw error;
    }
  },
  createCourseDetail: async (id, data) => {
    try {
      const res = await Courses.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title: data.courseName,
            entityMap: data.dataUpdate.entityMap,
            blocks: data.dataUpdate.blocks,
            categoryId: data.courseCategory,
          },
        },
        {
          returnDocument: "after",
        }
      );
      // console.log(res);
      return {
        message: "Chỉnh sửa thông tin khóa học thành công",
        data: res,
      };
    } catch (error) {
      throw error;
    }
  },
  publicCourse: async (id) => {
    try {
      //find course
      const course = await Courses.findOne({ _id: id });
      if (!course) {
        return { message: "Không tìm thấy khóa học" };
      }
      //update course
      const res = await Courses.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            public: !course.public,
          },
        },
        {
          returnDocument: "after",
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  deleteLesson: async (id) => {
    try {
      //delete lesson
      await Lessons.deleteOne({ _id: id });
      return { message: "Xóa bài học thành công" };
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (id) => {
    try {
      //delete question
      await Questions.deleteOne({ _id: id });
      return { message: "Xóa câu hỏi thành công" };
    } catch (error) {
      throw error;
    }
  },
  createLessonQuestions: async (id, data) => {
    try {
      // console.log(data);
      for (const question of data) {
        console.log(mongoose.isObjectIdOrHexString(question._id));
        // find question created
        if (mongoose.isObjectIdOrHexString(question._id)) {
          //update question
          const res = await Questions.findOneAndUpdate(
            { _id: question._id },
            {
              $set: {
                question: question.question,
                answers: question.answers,
                correct: question.correct,
                explanation: question.explanation,
              },
            },
            {
              returnDocument: "after",
            }
          );
        } else {
          //create new question
          const newQuestion = await new Questions({
            lessonId: mongoose.Types.ObjectId.createFromHexString(id),
            question: question.question,
            answers: question.answers,
            correct: question.correct,
            explanation: question.explanation,
          });
          //save to database
          await newQuestion.save();
        }
      }
      return { message: "Cập nhật câu hỏi thành công" };
    } catch (error) {
      throw error;
    }
  },
  getLessonQuestions: async (id) => {
    try {
      const lessonQuestions = await Questions.find({ lessonId: id });
      return lessonQuestions;
    } catch (error) {
      throw error;
    }
  },
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
      const lessonContent = await Lessons.findOne({ _id: id })
        .populate("courseId")
        .populate("chapterId");
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
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "Users",
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
        //add lessons[] to chapter

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
            chapterOrderIds: id,
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
