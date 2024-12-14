import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notify } from "@components/Toast";
import { createAnswer, deleteAnswer, updateAnswer } from "@service/Answer";
import { deleteSubject } from "@service/Subject";

export default function useAnswer() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function updateCacheData(questionId, updateFunc) {
    queryClient.setQueryData(["questions"], (prev) => {
      if (!prev) return prev;

      const newData = {
        ...prev,
        pages: prev.pages.map((page) => ({
          ...page,
          results: page.results.map((item) => (item.id === questionId ? updateFunc(item) : item)),
        })),
      };

      return newData;
    });
  }

  const create = useMutation({
    mutationFn: ({ questionId, content, isRejected }) => {
      return createAnswer(questionId, content, isRejected);
    },
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 답변 생성을 실패했습니다." }),
    onSuccess: (data) => {
      Notify({ type: "success", message: "답변을 작성했습니다." });
      updateCacheData(data.questionId, (item) => ({ ...item, answer: data }));
    },
  });

  const update = useMutation({
    mutationFn: ({ answerId, content, isRejected }) => {
      return updateAnswer(answerId, content, isRejected);
    },
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 답변 수정을 실패했습니다." }),
    onSuccess: (data) => {
      Notify({ type: "success", message: "답변을 수정했습니다." });
      updateCacheData(data.questionId, (item) => ({ ...item, answer: data }));
    },
  });

  const remove = useMutation({
    mutationFn: ({ answerId }) => {
      if (!answerId) return Notify({ type: "error", message: "삭제할 내용이 없습니다." });
      return deleteAnswer(answerId);
    },
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 답변 삭제를 실패했습니다." }),
    onSuccess: (_, { questionId }) => {
      Notify({ type: "success", message: "답변을 삭제했습니다." });
      updateCacheData(questionId, (item) => {
        const newItem = { ...item };
        delete newItem.answer;

        return newItem;
      });
    },
  });

  const reject = useMutation({
    mutationFn: ({ questionId, answerId, content, isRejected }) => {
      if (answerId) {
        return updateAnswer(answerId, content, isRejected);
      } else {
        return createAnswer(questionId, content, isRejected);
      }
    },
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 거절을 실패했습니다." }),
    onSuccess: (data) => {
      Notify({ type: "success", message: "답변을 거절했습니다." });
      updateCacheData(data.questionId, (item) => ({ ...item, answer: data }));
    },
  });

  const removeFeed = useMutation({
    mutationFn: ({ subjectId }) => deleteSubject(subjectId),
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 피드 삭제를 실패했습니다." }),
    onSuccess: () => {
      Notify({ type: "success", message: "성공적으로 피드를 삭제했습니다." });
      navigate("/list");
    },
  });

  const isPending = create.isPending || update.isPending || remove.isPending || reject.isPending;

  return {
    create: create.mutate,
    update: update.mutate,
    remove: remove.mutate,
    reject: reject.mutate,
    removeFeed: removeFeed.mutate,
    isPending,
  };
}
