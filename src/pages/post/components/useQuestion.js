import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notify } from "@components/Toast";
import { createQuestion, deleteQuestion } from "@service/Question";

export default function useQuestion(subjectId) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: ({ content }) => createQuestion(subjectId, content),
    onSuccess: async (data, { subjectId }) => {
      Notify({
        type: "success",
        message: "성공적으로 작성했습니다.",
      });

      queryClient.setQueriesData(["questions", subjectId], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page, index) => {
            if (index === 0) {
              return {
                ...page,
                count: page.count + 1,
                results: [data, ...page.results],
              };
            }
            return page;
          }),
        };

        return newData;
      });
    },
    onError: () =>
      Notify({
        type: "error",
        message: "등록에 실패했습니다. 다시 확인해주세요",
      }),
  });

  const remove = useMutation({
    mutationFn: ({ questionId }) => deleteQuestion(questionId),
    onError: () =>
      Notify({
        type: "error",
        message: "문제가 생겨서, 질문 삭제에 실패했습니다.",
      }),
    onSuccess: (_, { questionId }) => {
      Notify({
        type: "success",
        message: "질문을 삭제했습니다.",
      });

      queryClient.setQueriesData(["questions", subjectId], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            results: page.results.filter((item) => item.id !== questionId),
          })),
        };

        return newData;
      });
    },
  });

  const isPending = create.isPending || remove.isPending;

  return {
    create: create.mutate,
    remove: remove.mutate,
    isPending,
  };
}
