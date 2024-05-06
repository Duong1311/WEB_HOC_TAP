import axios from "~/utils/CustomizeAxios";

const getAllCourseCreate = (id) => {
  return axios.get(`/course/AllCourseDetails/${id}`);
};

const getAllCategory = () => {
  return axios.get("/course/getAllCategory");
};
const createNewCourse = (data) => {
  return axios.post("/course/createCourse", data);
};
const getCourseCreatedById = (id) => {
  return axios.get(`/course/CourseDetails/${id}`);
};

export {
  getAllCourseCreate,
  getAllCategory,
  createNewCourse,
  getCourseCreatedById,
};
