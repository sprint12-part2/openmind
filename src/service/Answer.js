import { axiosInstance } from "./Axios";

// 답변 생성
export async function createAnswer(questionId, content, isRejected) {
  const response = await axiosInstance.post(`/questions/${questionId}/answers/`, {
    content,
    isRejected,
  });
  return response.data;
}

// 답변 조회
export async function fetchAnswerById(answerId) {
  const response = await axiosInstance.get(`/answers/${answerId}/`);
  return response.data;
}

// 답변 삭제
export async function deleteAnswer(answerId) {
  const response = await axiosInstance.delete(`/answers/${answerId}/`);
  return response.status === 204; // 성공적으로 삭제되면 true 반환
}

// 답변 수정 (전체 수정 - PUT)
export async function updateAnswer(answerId, content, isRejected) {
  const response = await axiosInstance.put(`/answers/${answerId}/`, {
    content,
    isRejected,
  });
  return response.data;
}

// 답변 수정 (부분 수정 - PATCH)
export async function partialUpdateAnswer(answerId, content, isRejected) {
  const response = await axiosInstance.patch(`/answers/${answerId}/`, {
    content,
    isRejected,
  });
  return response.data;
}
