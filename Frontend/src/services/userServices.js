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
export const getAllUser = (title, page, limit) => {
  return axios.get(
    `/user/getAllUser?title=${title}&page=${page}&limit=${limit}`
  );
};
export const blockUser = (userId) => {
  return axios.put(`/user/blockUser/${userId}`);
};
export const sendEmailOtp = (email, OTP) => {
  return axios.post("/user/send_recovery_email", {
    OTP,
    recipient_email: email,
  });
};
export const recoverPassword = (email, newPassword) => {
  return axios.put("/user/recover_password", { email, newPassword });
};
