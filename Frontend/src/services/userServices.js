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
export const getAllCourseStudys = (id, page, limit, title) => {
  return axios.get(
    `/user/getAllCourseStudys/${id} ?page=${page}&limit=${limit} &title=${title}`
  );
};
export const deleteCourseHistory = (id) => {
  return axios.delete(`/user/deleteCourseHistory/${id}`);
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
export const userAvatar = (data) => {
  return axios.post("/user/avatar", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
