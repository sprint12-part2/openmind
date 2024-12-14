import { axiosInstance } from "./Axios";

// 질문 생성
export async function createQuestion(subjectId, content) {
  const response = await axiosInstance.post(`/subjects/${subjectId}/questions/`, {
    content,
  });
  return response.data;
}

// 대상 질문 목록 조회
export async function fetchQuestions(subjectId, page = 1, itemsPerPage = 8) {
  const response = await axiosInstance.get(`/subjects/${subjectId}/questions/`, {
    params: {
      limit: itemsPerPage,
      offset: (page - 1) * itemsPerPage,
    },
  });
  return response.data;
}

// 특정 질문 조회
export async function fetchQuestionById(questionId) {
  const response = await axiosInstance.get(`/questions/${questionId}/`);
  return response.data;
}

// 질문 삭제
export async function deleteQuestion(questionId) {
  const response = await axiosInstance.delete(`/questions/${questionId}/`);
  return response.data;
}

// 질문 리액션 추가
export async function addQuestionReaction(questionId, type) {
  const response = await axiosInstance.post(`/questions/${questionId}/reaction/`, {
    type,
  });
  return response.data;
}
