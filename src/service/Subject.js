import { axiosInstance } from "./Axios";

// 질문 대상 목록 조회
export async function fetchSubjects(page = 1, itemsPerPage = 8, sort = "time") {
  const response = await axiosInstance.get("/subjects/", {
    params: {
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
      sort,
    },
  });
  return response.data;
}

//질문 대상 생성
export async function createSubject(subjectData) {
  const response = await axiosInstance.post("/subjects/", subjectData);
  return response.data;
}

// 특정 질문 대상 조회
export async function fetchSubjectById(subjectId) {
  const response = await axiosInstance.get(`/subjects/${subjectId}/`);
  return response.data;
}

// 질문 대상 삭제
export async function deleteSubject(subjectId) {
  const response = await axiosInstance.delete(`/subjects/${subjectId}/`);
  return response.data;
}
