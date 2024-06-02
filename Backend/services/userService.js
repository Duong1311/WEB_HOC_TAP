const User = require("../models/user");
const bcrypt = require("bcrypt");
const courseStudy = require("../models/courseStudy");
const Courses = require("../models/courseModel");

const userService = {
  addCourseToHistory: async (userId, courseId) => {
    try {
      console.log(userId, courseId);
      const user = await User.findById(userId);
      if (!user) {
        return {
          status: 404,
          message: "Người dùng không tồn tại",
        };
      }
      const course = await Courses.findById(courseId);
      if (!course) {
        return {
          status: 404,
          message: "Khóa học không tồn tại",
        };
      }
      const courseStudyExist = await courseStudy.findOne({
        userId: userId,
        courseId: courseId,
      });
      if (courseStudyExist) {
        return {
          status: 201,
          message: "Khóa học đã tồn tại trong lịch sử học tập",
        };
      }
      const newCourseStudy = new courseStudy({
        userId: userId,
        courseId: courseId,
      });
      await newCourseStudy.save();
      return {
        status: 200,
        message: "Thêm khóa học vào lịch sử học tập thành công",
      };
    } catch (error) {
      return error;
    }
  },
  getAllCourseStudys: async (id) => {
    try {
      console.log("ser", id);
      const courseStudys = await courseStudy
        .find({ userId: id })
        .populate("courseId");
      console.log(courseStudys);
      return courseStudys;
    } catch (error) {
      return error;
    }
  },
  updateUserPassword: async (id, data) => {
    try {
      console.log(data);
      // const salt = await bcrypt.genSalt(10);
      // const hashedNewPass = await bcrypt.hash(data.password, salt);
      //get old password and compare with new password
      const user = await User.findById(id);
      const isMatch = await bcrypt.compare(data.password, user.password);

      console.log("ismath", isMatch);
      console.log("user pass", user.password);
      if (!isMatch) {
        return {
          status: 201,

          message: "Mật khẩu cũ không đúng",
        };
      }
      //update new password
      const updateUserPassword = await User.findOneAndUpdate(
        { _id: id },
        { $set: { password: data.password } },
        {
          returnDocument: "after",
        }
      );
      return {
        status: 200,
        message: "Cập nhật mật khẩu thành công",

        data: updateUserPassword,
      };
    } catch (error) {
      return error;
    }
  },
  getUserInfor: async (id) => {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  },
  updateUserInfor: async (id, data) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: data },
        {
          returnDocument: "after",
        }
      );
      return {
        message: "Chỉnh sửa thông tin thành công",
        data: user,
      };
    } catch (error) {
      return error;
    }
  },
};
module.exports = userService;
