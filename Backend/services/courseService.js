// const { StatusCodes } = require("http-status-codes");
const Courses = require("../models/courseModel");
const Chapters = require("../models/chapterModel");
const Lessons = require("../models/lessonModel");
const Category = require("../models/categoryModel");
const Questions = require("../models/questionModel");
const Ratings = require("../models/ratingModel");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { cloneDeep } = require("lodash");
const { uploadFile, deleteFile } = require("../models/uploadModel");

const courseService = {
  getChapterData: async (id) => {
    const chapterData = await Chapters.findOne(
      { _id: id },
      { lessonOrderIds: 1 }
    );
    return chapterData;
  },
  deleteRating: async (id) => {
    //
    const rating = await Ratings.findOne({ _id: id });
    // update rating count, total rating in course
    const course = await Courses.findOne({ _id: rating.courseId });
    // console.log(course);
    if (course) {
      //if rating count = 1
      if (course.ratingCount === 1) {
        console.log("1");
        await Courses.findOneAndUpdate(
          { _id: rating.courseId },
          {
            $set: {
              totalRating: 0,
              ratingCount: 0,
            },
          },
          {
            returnDocument: "after",
          }
        );
      } else {
        const newRatingCount = course.ratingCount - 1;
        //if new
        const newTotalRating =
          (course.totalRating * course.ratingCount - rating.rating) /
          newRatingCount;

        const res = await Courses.findOneAndUpdate(
          { _id: rating.courseId },
          {
            $set: {
              totalRating: newTotalRating,
              ratingCount: newRatingCount,
            },
          },
          {
            returnDocument: "after",
          }
        );
        console.log("update");
      }
    }
    console.log("delete rating");

    //delete rating by id
    await Ratings.findByIdAndDelete(id);

    return {
      status: 200,
      message: "Xóa đánh giá thành công",
    };
  },
  updateLessonTitle: async (id, data) => {
    console.log(data);
    console.log(id);
    const res = await Lessons.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: data.title,
        },
      },
      {
        returnDocument: "after",
      }
    );
    return {
      data: res,
      message: "Cập nhật tiêu đề bài học thành công",
    };
  },
  searchGv: async (query) => {
    //search course have userId by title

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const matchQuery = {
      userId: query.id,
    };
    if (query.title) {
      matchQuery.$text = { $search: query.title };
    }
    const totalCourses = await Courses.countDocuments(matchQuery);
    const totalPage = Math.ceil(totalCourses / limit);

    const courses = await Courses.find(matchQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("categoryId")
      .populate("userId")
      .select("-entityMap -blocks");

    return { courses, totalPage, totalCourses };
  },
  searchCourse: async (query) => {
    try {
      console.log(query);
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const sortParam = query.sort || "studyCount";
      const matchQuery = {
        public: true,
      };

      if (query.title) {
        matchQuery.$text = { $search: query.title };
      }

      if (query.categoryId) {
        matchQuery.categoryId = query.categoryId;
      }
      console.log(matchQuery);
      const totalCourses = await Courses.countDocuments(matchQuery);
      const totalPage = Math.ceil(totalCourses / limit);

      const courses = await Courses.find(matchQuery)
        .sort({ [sortParam]: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("userId")
        .populate("categoryId")
        .select("-entityMap -blocks");
      // console.log("course", courses);
      return { courses, totalPage, totalCourses };
    } catch (error) {
      throw error;
    }
  },
  deleteCourse: async (id) => {
    try {
      //delete course
      await Courses.deleteOne({ _id: id });
      //delete all chapters in course
      await Chapters.deleteMany({ courseId: id });
      //delete all lessons in course
      await Lessons.deleteMany({ courseId: id });
      //delete all ratings in course
      await Ratings.deleteMany({ courseId: id });

      return { message: "Xóa khóa học thành công" };
    } catch (error) {
      throw error;
    }
  },
  getRatingByCourseId: async (id, query) => {
    console.log(query);
    console.log(id);
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

    const rating = await Ratings.find({ courseId: id })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("userId");

    const totalCount = await Ratings.countDocuments({ courseId: id });
    const totalPages = Math.ceil(totalCount / limit);
    return { rating, totalPages, totalCount };
  },
  createRating: async (data) => {
    try {
      const newRating = await new Ratings({
        userId: data.userId,
        courseId: data.courseId,
        rating: data.rating,
        comment: data.comment,
      });
      //save to database
      await newRating.save();
      // update totalRating, ratingCount in course
      const course = await Courses.findOne({ _id: data.courseId });
      if (course) {
        const newRatingCount = course.ratingCount + 1;
        const newTotalRating =
          (course.totalRating * course.ratingCount + data.rating) /
          newRatingCount;
        const res = await Courses.findOneAndUpdate(
          { _id: data.courseId },
          {
            $set: {
              totalRating: newTotalRating,
              ratingCount: newRatingCount,
            },
          },
          {
            returnDocument: "after",
          }
        );
        return res;
      } else {
        return { message: "Không tìm thấy khóa học" };
      }
    } catch (error) {
      throw error;
    }
  },
  getAllCourses: async () => {
    const courses = await Courses.find({ public: true })
      .populate("userId")
      .populate("categoryId")
      .select("-entityMap -blocks");

    return courses;
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
    console.log(data);
    const res = await uploadFile({ shared: true }, data);
    console.log(res);
    // delete old course image
    const courseOld = await Courses.findOne({ _id: data.originalname });
    if (courseOld.imageId) {
      const resDelete = await deleteFile(courseOld.imageId);
      console.log("delete", resDelete);
    }
    // update course image
    const course = await Courses.findOneAndUpdate(
      { _id: data.originalname },
      {
        $set: {
          imageId: res.fileId,
        },
      },
      {
        returnDocument: "after",
      }
    );
    return course;
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
      console.log(id);
      const lessonDelete = await Lessons.findOne({ _id: id });
      if (!lessonDelete) {
        return { message: "Không tìm thấy bài học" };
      }

      //delete lesson
      await Lessons.deleteOne({ _id: id });
      //delete all questions in lesson
      await Questions.deleteMany({ lessonId: id });
      // delete lesson in chapter

      const res = await Chapters.findOneAndUpdate(
        { _id: lessonDelete.chapterId },
        {
          $pull: {
            lessonOrderIds: id,
          },
        },
        {
          returnDocument: "after",
        }
      );
      // console.log(res);

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
      const courseDetails = await Courses.find({ userId: id })
        .populate("categoryId")
        .select("-entityMap -blocks");

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
