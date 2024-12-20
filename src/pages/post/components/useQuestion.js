import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addQuestionReaction, createQuestion, deleteQuestion } from "@service/Question";

export default function useQuestion(subjectId) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: ({ content }) => createQuestion(subjectId, content),
    onSuccess: async (data, { subjectId }) => {
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
  });

  const remove = useMutation({
    mutationFn: ({ questionId }) => deleteQuestion(questionId),
    onSuccess: (_, { questionId }) => {
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

  const reaction = useMutation({
    mutationFn: ({ questionId, type }) => addQuestionReaction(questionId, type),
    onMutate: async ({ questionId, type }) => {
      // 에러시 원복 데이터 생성
      const prevData = queryClient.getQueriesData(["questions", subjectId]);

      // optimistic update (기존 데이터 이용해서 ui바로 업데이트)
      queryClient.setQueriesData(["questions", subjectId], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            results: page.results.map((item) =>
              item.id === questionId ? { ...item, [type]: item[type] + 1 } : item,
            ),
          })),
        };
        return newData;
      });

      return { prevData };
    },
    onError: (error, _, context) => {
      queryClient.setQueriesData(["questions", subjectId], context.prevData);
    },
  });

  const isPending = create.isPending || remove.isPending || reaction.isPending;

  return {
    create: create.mutateAsync,
    remove: remove.mutateAsync,
    reaction: reaction.mutateAsync,
    isPending,
  };
}
