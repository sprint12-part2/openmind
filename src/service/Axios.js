import axios from "axios";

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
  baseURL: "https://openmind-api.vercel.app/12-2/", // API 기본 URL
});
