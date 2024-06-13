const User = require("../models/user");
const bcrypt = require("bcrypt");
const courseStudy = require("../models/courseStudy");
const Courses = require("../models/courseModel");
const nodemailer = require("nodemailer");
// const user = require("../models/user");
require("dotenv").config();

const userService = {
  recover_password: async (data) => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return {
        status: 404,
        error: "Email không tồn tại",
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(data.newPassword, salt);
    const updateUserPassword = await User.findOneAndUpdate(
      { email: data.email },
      { $set: { password: hashed } },
      {
        returnDocument: "after",
      }
    );
    return {
      status: 200,
      message: "Cập nhật mật khẩu thành công",
      data: updateUserPassword,
    };
  },
  sendEmail: ({ recipient_email, OTP }) => {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });

      const mail_configs = {
        from: process.env.MY_EMAIL,
        to: recipient_email,
        subject: "GPTACADEMY - Lấy lại mật khẩu",
        html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">GPT ACADEMY</a>
    </div>
    <p style="font-size:1.1em">Xin chào,</p>
    <p>Cảm ơn bạn đã chọn GPT ACADEMY. Sử dụng OTP sau để hoàn tất Quy trình khôi phục mật khẩu của bạn. OTP có hiệu lực trong 5 phút</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Trân trọng,<br />GPT ACADEMY</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>GPT ACADEMY Inc</p>
      <p>200 Bạch Mai, Hai Ba Trưng</p>
      <p>Hà Nội</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
      };
      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occured` });
        }
        return resolve({ message: "Email sent succesfuly" });
      });
    });
  },
  send_recovery_email: async (data) => {
    //check if email exist
    const user = await User.findOne({ email: data.recipient_email });
    if (!user) {
      return {
        status: 404,
        error: "Email không tồn tại",
      };
    }
    const res = await userService.sendEmail(data);
    return res;
  },
  blockUser: async (id) => {
    const user = await User.findById(id);
    if (!user) {
      return {
        status: 404,
        message: "Người dùng không tồn tại",
      };
    }
    const blockUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { status: !user.status } },
      {
        returnDocument: "after",
      }
    );
    return {
      status: 200,
      message: "Khóa tài khoản thành công",
      data: blockUser,
    };
  },

  getAllUser: async (query) => {
    //get all user and search by username and email
    console.log(query);

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const matchQuery = {
      admin: false,
    };

    if (query.title) {
      matchQuery.$text = { $search: query.title };
    }
    console.log(matchQuery);
    const totalCourses = await User.countDocuments(matchQuery);
    const totalPage = Math.ceil(totalCourses / limit);
    const allUser = await User.find(matchQuery)
      .select({
        username: 1,
        email: 1,
        status: 1,
      })
      .skip((page - 1) * limit)
      .limit(limit);
    // console.log(allUser);
    return { allUser, totalPage, totalCourses };
  },
  addCourseToHistory: async (userId, courseId) => {
    try {
      // console.log(userId, courseId);
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
      // increase course study count
      const res = await Courses.findOneAndUpdate(
        { _id: courseId },
        { $inc: { studyCount: 1 } },
        {
          returnDocument: "after",
        }
      );
      console.log(res);
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
    console.log(data);

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
    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(data.newPassword, salt);
      console.log(hashed);
      const updateUserPassword = await User.findOneAndUpdate(
        { _id: id },
        { $set: { password: hashed } },
        {
          returnDocument: "after",
        }
      );
      return {
        status: 200,
        message: "Cập nhật mật khẩu thành công",

        data: updateUserPassword,
      };
    }
    return {
      status: 201,
      message: "Có lỗi xảy ra",
    };
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
