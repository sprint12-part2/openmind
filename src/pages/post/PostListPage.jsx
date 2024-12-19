import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "@service/Subject";
import PostList from "./components/PostList";
import { useItemPerPage } from "./components/useItemPerPage";

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
    keepPreviousData: true, // 페이지 이동 간 캐시 유지
  });

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setSearchParams({ page, sort });
  };

  // 정렬 변경 핸들러
  const handleSortChange = (value) => {
    setSearchParams({ page: 1, sort: value });
  };

  // 로딩 및 에러 상태 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  // 렌더링
  return (
    <PostList
      subjects={data.results} // 데이터 목록 전달
      totalItems={data.count} // 전체 항목 수 전달
      currentPage={currentPage} // 현재 페이지 전달
      onPageChange={handlePageChange} // 페이지 변경 핸들러 전달
      onSortChange={handleSortChange} // 정렬 변경 핸들러 전달
      sort={sort} // 현재 정렬 기준 전달
    />
  );
}
