import axios from 'axios';
import { LANGUAGE_VERSIONS } from "../utils/constants";

// Axios Instance for making HTTP requests
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


// Piston API
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  
  return response.data;
};



export default axiosInstance;
