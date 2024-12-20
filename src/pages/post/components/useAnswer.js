import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notify } from "@components/Toast";
import { createAnswer, deleteAnswer, updateAnswer } from "@service/Answer";

export default function useAnswer(subjectId) {
  const queryClient = useQueryClient();

  function updateCacheData(questionId, updateFunc) {
    queryClient.setQueryData(["questions", subjectId], (prev) => {
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
    onSuccess: (data) => {
      updateCacheData(data.questionId, (item) => ({ ...item, answer: data }));
    },
  });

  const update = useMutation({
    mutationFn: ({ answerId, content, isRejected }) => {
      return updateAnswer(answerId, content, isRejected);
    },
    onSuccess: (data) => {
      updateCacheData(data.questionId, (item) => ({ ...item, answer: data }));
    },
  });

  const remove = useMutation({
    mutationFn: ({ answerId }) => {
      if (!answerId) return Notify({ type: "error", message: "삭제할 내용이 없습니다." });
      return deleteAnswer(answerId);
    },
    onSuccess: (_, { questionId }) => {
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
    onSuccess: (data) => {
      updateCacheData(data.questionId, (item) => ({ ...item, answer: data }));
    },
  });

  const isPending = create.isPending || update.isPending || remove.isPending || reject.isPending;

  return {
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
    reject: reject.mutateAsync,
    isPending,
  };
}
