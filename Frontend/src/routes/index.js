import CreateCourse from "~/pages/CreateCourse/CreateCourse.jsx";
import GvLayout from "~/layout/GvLayout/GvLayout.jsx";
import CourseChapter from "../pages/Chapter/CourseChapter.jsx";
import GvHome from "../pages/Gvhome/GvHome.jsx";
import Home from "../pages/Home/home.jsx";
import CourseLesson from "../pages/Lesson/CourseLesson.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import CourseDetail from "~/pages/CourseDetail/CourseDetail.jsx";
import UserCourseDetail from "~/pages/UserCourseDetail/UserCourseDetail.jsx";
import UserLessonDetail from "~/pages/UserLessonDetail/UserLessonDetail.jsx";
import UserProfile from "~/pages/UserProfile/UserProfile.jsx";
import UserCourseStudys from "~/pages/UserCourseStudys/UserCourseStudys.jsx";
import SearchLayout from "~/layout/SearchLayout/SearchLayout.jsx";
import Search from "~/pages/Search/Search.jsx";
import Admin from "~/pages/Admin/Admin.jsx";
import UserBan from "~/pages/Admin/UserBan.jsx";
import EmailInput from "~/pages/Login/ForgotPassword/EmailInput.jsx";
import OtpInput from "~/pages/Login/ForgotPassword/OtpInput.jsx";
import Reset from "~/pages/Login/ForgotPassword/Reset.jsx";
import UserDoQuestion from "~/pages/UserDoQuestion/UserDoQuestion.jsx";
import GvDetail from "~/pages/GvDetail/GvDetail.jsx";
const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/userdoquestion",
    component: UserDoQuestion,
  },
  {
    path: "/login",
    component: Login,
    layout: null,
  },
  {
    path: "/register",
    component: Register,
    layout: null,
  },
  {
    path: "/forgot-password",
    component: EmailInput,
    layout: null,
  },
  {
    path: "/forgot-password/otp",
    component: OtpInput,
    layout: null,
  },
  {
    path: "/forgot-password/reset",
    component: Reset,
    layout: null,
  },

  {
    path: "/gvhome",
    component: GvHome,
    layout: GvLayout,
  },
  {
    path: "/gvdetail/:id",
    component: GvDetail,
  },

  {
    path: "/coursedetail/:id",
    component: CourseDetail,
    layout: GvLayout,
  },
  {
    path: "/CourseChapter/:id",
    component: CourseChapter,
    layout: GvLayout,
  },
  {
    path: "/CourseLesson/:id",
    component: CourseLesson,
    layout: GvLayout,
  },
  {
    path: "/CreateCourse",
    component: CreateCourse,
    layout: GvLayout,
  },
  // user routes
  {
    path: "/usercoursedetail/:id",
    component: UserCourseDetail,
  },
  {
    path: "/userlessondetail/:id",
    component: UserLessonDetail,
  },
  {
    path: "/userprofile/:id",
    component: UserProfile,
  },
  {
    path: "/usercoursestudys/:id",
    component: UserCourseStudys,
  },
  {
    path: "/course/search",
    component: Search,
    layout: SearchLayout,
  },
  // admin routes
  {
    path: "/admin",
    component: Admin,
  },
  {
    path: "/admin/user",
    component: UserBan,
  },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
