import CreateCourse from "~/pages/createCourse/createCourse.jsx";
import GvLayout from "../components/Layout/GvLayout/GvLayout.jsx";
import CourseChapter from "../pages/chapter/CourseChapter.jsx";
import GvHome from "../pages/gvhome/GvHome.jsx";
import Home from "../pages/home/home.jsx";
import CourseLesson from "../pages/lesson/CourseLesson.jsx";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
import CourseDetail from "~/pages/CourseDetail/CourseDetail.jsx";
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
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
