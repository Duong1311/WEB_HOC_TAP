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
const createChapter = (data) => {
  return axios.post("/course/createChapter", data);
};
const createLesson = (data) => {
  return axios.post("/course/createLesson", data);
};
const createLessonContent = (id, data) => {
  return axios.post(`/course/createLessonContent/${id}`, data);
};
const getLessonContent = (id) => {
  return axios.get(`/course/getLessonContent/${id}`);
};
const updateMoveChapter = (courseId, updateData) => {
  return axios.put(`/course/moveChapter/${courseId}`, updateData);
};
const updateMoveLessonInOneChapter = (chapterId, updateData) => {
  return axios.put(`/course/moveLessonOne/${chapterId}`, updateData);
};

const updateChapter = (chapterId, data) => {
  return axios.put(`/course/updateChapter/${chapterId}`, data);
};
const deleteChapter = (chapterId) => {
  return axios.delete(`/course/deleteChapter/${chapterId}`);
};

export {
  getAllCourseCreate,
  getAllCategory,
  createNewCourse,
  getCourseCreatedById,
  createChapter,
  createLesson,
  updateMoveChapter,
  updateMoveLessonInOneChapter,
  updateChapter,
  deleteChapter,
  createLessonContent,
  getLessonContent,
};
