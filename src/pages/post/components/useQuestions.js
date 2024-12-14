import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { Notify } from "@components/Toast";
import { fetchQuestions } from "@service/Question";
import { deleteSubject } from "@service/Subject";

export default function useQuestions({ subjectId, itemPerPage }) {
  const navigate = useNavigate();
  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["questions"],
      queryFn: ({ pageParam }) => fetchQuestions(subjectId, pageParam, itemPerPage),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.next ? pages.length + 1 : null;
      },
    });

  const remove = useMutation({
    mutationFn: ({ subjectId }) => deleteSubject(subjectId),
    onError: () => Notify({ type: "error", message: "문제가 생겨서, 피드 삭제를 실패했습니다." }),
    onSuccess: () => {
      Notify({ type: "success", message: "성공적으로 피드를 삭제했습니다." });
      navigate("/list");
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const count = data?.pages[0].count;
  const results = data?.pages.flatMap((page) => page.results);

  return { count, results, ref, error, isLoading, isFetchingNextPage, remove: remove.mutate };
}
