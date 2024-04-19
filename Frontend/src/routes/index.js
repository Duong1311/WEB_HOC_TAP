import Home from "../pages/home/home.jsx";
import Login from "../pages/login/Login.jsx";
import Register from "../pages/register/Register.jsx";
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
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
