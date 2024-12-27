import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "@service/Subject";
import PostList from "./components/PostList";
import { useItemPerPage } from "./hooks/useItemPerPage";
import { PostListLoading } from "./components/PostListLoading";
import { PostListError } from "./components/PostListError";
import PostListWrapper from "./components/PostListWrapper";
import PostListFilter from "./components/PostListFilter";
import PostListPagination from "./components/PostListPagination";

/**
 * PostListPage 컴포넌트: 데이터 로직 및 상태 관리를 담당
 * - 데이터를 React Query로 패칭
 * - PostList에 데이터를 전달하여 UI 렌더링
 */

export default function PostListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const sort = searchParams.get("sort") || "time";

  // 반응형 아이템 개수 가져오기
  const itemsPerPage = useItemPerPage();

  // React Query로 데이터 패칭
  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects", currentPage, itemsPerPage, sort],
    queryFn: () => fetchSubjects(currentPage, itemsPerPage, sort),
    keepPreviousData: true, // 이전 데이터 유지
    retry: false, // 실패해도 재시도 안하게 설정
  });

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setSearchParams({ page, sort });
  };

  // 정렬 변경 핸들러
  const handleSortChange = (value) => {
    setSearchParams({ page: 1, sort: value });
  };

  // 에러 상태 처리
  if (error) {
    return <PostListError message={error?.message} />;
  }

  return (
    <PostListWrapper>
      <PostListFilter onSortChange={handleSortChange} sort={sort} />
      {isLoading ? (
        <PostListLoading />
      ) : (
        <>
          <PostList subjects={data.results} />
          <PostListPagination
            totalItems={data.count}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </PostListWrapper>
  );
}
