import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { fetchQuestions } from "@service/Question";

export default function useQuestions(id) {
  const { data, error, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["questions"],
      queryFn: ({ pageParam }) => fetchQuestions(id, pageParam, 5),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return lastPage.next ? pages.length + 1 : null;
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

  return { count, results, ref, error, isLoading, isFetchingNextPage };
}