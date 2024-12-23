import axios from "axios";

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // API 기본 URL
});
