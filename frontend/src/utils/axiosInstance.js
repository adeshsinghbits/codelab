import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000',
  withCredentials: true,
});

// Axios POST APIs
export const saveUserDetails = (formData) => axiosInstance.post("/user/save", formData);
export const uploadProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("picture", file);
  return axiosInstance.post("/user/upload-pic", formData);
};
export const scheduleMeeting = (data) => axiosInstance.post("/user/schedule-meet", data);



export default axiosInstance;
