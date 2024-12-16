import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notify } from "@components/Toast";
import { createQuestion } from "@service/Question";

export default function useQuestion(subjectId) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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

  return {
    mutate,
    isPending,
  };
}
