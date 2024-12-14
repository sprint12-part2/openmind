import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notify } from "@components/Toast";
import { createAnswer, deleteAnswer, updateAnswer } from "@service/Answer";

export default function useAnswer() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: ({ questionId, content, isRejected }) => {
      return createAnswer(questionId, content, isRejected);
    },
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 답변 생성을 실패했습니다." }),
    onSuccess: async (data) => {
      queryClient.setQueryData(["questions"], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            results: page.results.map((item) =>
              item.id === data.questionId ? { ...item, answer: data } : item,
            ),
          })),
        };

        return newData;
      });
    },
  });

  const update = useMutation({
    mutationFn: ({ answerId, content, isRejected }) => {
      return updateAnswer(answerId, content, isRejected);
    },
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 답변 수정을 실패했습니다." }),
    onSuccess: async (data) => {
      queryClient.setQueryData(["questions"], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            results: page.results.map((item) =>
              item.id === data.questionId ? { ...item, answer: data } : item,
            ),
          })),
        };

        return newData;
      });
    },
  });

  const remove = useMutation({
    mutationFn: ({ answerId }) => {
      if (!answerId) return Notify({ type: "error", message: "삭제할 내용이 없습니다." });
      return deleteAnswer(answerId);
    },
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 답변 삭제를 실패했습니다." }),
    onSuccess: (_, { questionId }) => {
      queryClient.setQueryData(["questions"], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            results: page.results.map((item) => {
              if (item.id === questionId) {
                const newItem = { ...item };
                delete newItem.answer;
                return newItem;
              }
              return item;
            }),
          })),
        };

        return newData;
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
    onSuccess: async (data) => {
      queryClient.setQueryData(["questions"], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            results: page.results.map((item) =>
              item.id === data.questionId ? { ...item, answer: data } : item,
            ),
          })),
        };

        return newData;
      });
    },
  });

  const isPending = create.isPending || update.isPending || remove.isPending || reject.isPending;

  return {
    create: create.mutate,
    update: update.mutate,
    remove: remove.mutate,
    reject: reject.mutate,
    isPending,
  };
}
