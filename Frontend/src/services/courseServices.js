import axios from "~/utils/CustomizeAxios";

const getAllCourseCreate = (id) => {
  return axios.get(`/course/AllCourseDetails/${id}`);
};

const getAllCategory = () => {
  return axios.get("/course/getAllCategory");
};

export { getAllCourseCreate, getAllCategory };
