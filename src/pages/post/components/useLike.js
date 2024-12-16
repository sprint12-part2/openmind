import { Notify } from "@components/Toast";
import { addQuestionReaction } from "@service/Question";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLike(subjectId) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ questionId, type }) => addQuestionReaction(questionId, type),
    onMutate: async ({ questionId, type }) => {
      // 에러시 원복 데이터 생성
      const prevData = queryClient.getQueriesData(["questions"]);

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
      Notify({ type: "error", message: "문제가 발생하여, 요청에 실패했어요." });
      queryClient.setQueriesData(["questions", subjectId], context.prevData);
    },
    onSuccess: async (data) => {
      // 성공하면서 받아온 데이터로 바꿔치기
      queryClient.setQueriesData(["questions", subjectId], (prev) => {
        if (!prev) return prev;

        const newData = {
          ...prev,
          pages: prev.pages.map((page) => ({
            ...page,
            results: page.results.map((item) => (item.id === data.id ? data : item)),
          })),
        };

        return newData;
      });
    },
  });

  return { mutate };
}
