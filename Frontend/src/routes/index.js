import CreateCourse from "~/pages/createCourse/createCourse.jsx";
import GvLayout from "../components/Layout/GvLayout/GvLayout.jsx";
import CourseChapter from "../pages/chapter/CourseChapter.jsx";
import GvHome from "../pages/gvhome/GvHome.jsx";
import Home from "../pages/home/home.jsx";
import CourseLesson from "../pages/lesson/CourseLesson.jsx";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import CourseDetail from "~/pages/CourseDetail/CourseDetail.jsx";
import UserCourseDetail from "~/pages/UserCourseDetail/UserCourseDetail.jsx";
import UserLessonDetail from "~/pages/UserLessonDetail/UserLessonDetail.jsx";
import UserProfile from "~/pages/UserProfile/UserProfile.jsx";
import UserCourseStudys from "~/pages/UserCourseStudys/UserCourseStudys.jsx";
import SearchLayout from "~/components/Layout/SearchLayout/SearchLayout.jsx";
import Search from "~/pages/Search/Search.jsx";
const publicRoutes = [
  {
    path: "/",
    component: Home,
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
    path: "/gvhome",
    component: GvHome,
    layout: GvLayout,
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
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
