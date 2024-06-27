import axios from "~/utils/CustomizeAxios";
//course cua rieng giang vien
const getAllCourseCreate = (id) => {
  return axios.get(`/course/AllCourseDetails/${id}`);
};
const getAllcourses = () => {
  return axios.get("/course/getAllCourses");
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
const createLessonQuestion = (id, data) => {
  return axios.post(`/course/createLessonQuestions/${id}`, data);
};
const getLessonContent = (id) => {
  return axios.get(`/course/getLessonContent/${id}`);
};
const getLessonQuestions = (id) => {
  return axios.get(`/course/getLessonQuestions/${id}`);
};
const updateMoveChapter = (courseId, updateData) => {
  return axios.put(`/course/moveChapter/${courseId}`, updateData);
};
const updateMoveLessonInOneChapter = (chapterId, updateData) => {
  return axios.put(`/course/moveLessonOne/${chapterId}`, updateData);
};
const updateLessonTitle = (lessonId, data) => {
  return axios.post(`/course/updateLessonTitle/${lessonId}`, data);
};

const updateChapter = (chapterId, data) => {
  return axios.put(`/course/updateChapter/${chapterId}`, data);
};
const deleteChapter = (chapterId) => {
  return axios.delete(`/course/deleteChapter/${chapterId}`);
};
const deleteQuestionApi = (questionId) => {
  return axios.delete(`/course/deleteQuestion/${questionId}`);
};
const deleteLesson = (lessonId) => {
  return axios.delete(`/course/deleteLesson/${lessonId}`);
};
const createLessonQuestionByOpenAi = (data) => {
  return axios.post("/openai", data);
};
const publicCourse = (courseId) => {
  return axios.put(`/course/publicCourse/${courseId}`);
};
const courseDetail = (id, data) => {
  return axios.post(`/course/createCourseDetail/${id}`, data);
};
const courseImage = (data) => {
  return axios.post(`/course/createCourseImage`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const getCourseDetail = (id) => {
  return axios.get(`/course/getCourseDetail/${id}`);
};
const createRating = (data) => {
  return axios.post("/course/createRating", data);
};
const getRatingByCourseId = (id, page, limit) => {
  return axios.get(
    `/course/getRatingByCourseId/${id}?page=${page}&limit=${limit}`
  );
};
const deleteRatingById = (id) => {
  return axios.delete(`/course/deleteRating/${id}`);
};

const deleteCourse = (id) => {
  return axios.delete(`/course/deleteCourse/${id}`);
};
const searchCourse = (title, selectedCategory, sort, page, limit) => {
  return axios.get(
    `/course/searchCourse?title=${title}&categoryId=${selectedCategory}&sort=${sort}&page=${page}&limit=${limit}`
  );
};
const searchGv = (id, title, page) => {
  return axios.get(
    `/course/searchGv?id=${id}&title=${title}&page=${page}&limit=10`
  );
};

const getChapterData = (id) => {
  return axios.get(`/course/getChapterData/${id}`);
};

export {
  getChapterData,
  searchCourse,
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
  getLessonQuestions,
  createLessonQuestion,
  createLessonQuestionByOpenAi,
  deleteQuestionApi,
  deleteLesson,
  publicCourse,
  courseDetail,
  getCourseDetail,
  courseImage,
  getAllcourses,
  createRating,
  getRatingByCourseId,
  deleteCourse,
  searchGv,
  updateLessonTitle,
  deleteRatingById,
};
