import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Notify } from "@components/Toast";
import { createQuestion } from "@service/Question";

export default function useQuestion() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ subjectId, content }) => createQuestion(subjectId, content),
    onSuccess: async (data) => {
      Notify({
        type: "success",
        message: "성공적으로 작성했습니다.",
      });

      queryClient.setQueryData(["questions"], (prev) => {
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
