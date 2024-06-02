import axios from "~/utils/CustomizeAxios";
export const getUserInfor = (id) => {
  return axios.get(`/user/getUserInfor/${id}`);
};
export const updateUserInfor = (id, data) => {
  return axios.put(`/user/updateUserInfor/${id}`, data);
};
export const updateUserPassword = (id, data) => {
  return axios.put(`/user/updateUserPassword/${id}`, data);
};
export const getAllCourseStudys = (id) => {
  return axios.get(`/user/getAllCourseStudys/${id}`);
};
export const addCourseToHistoryApi = (userId, courseId) => {
  return axios.post(`/user/addCourseToHistory`, { userId, courseId });
};
