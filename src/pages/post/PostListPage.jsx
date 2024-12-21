import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSubjects } from "@service/Subject";
import PostList from "./components/PostList";
import { useItemPerPage } from "./components/useItemPerPage";
import { PostListLoading } from "./components/PostListLoading";
import { PostListError } from "./components/PostListError";

/**
 * PostListPage 컴포넌트: 데이터 로직 및 상태 관리를 담당
 * - 데이터를 React Query로 패칭
 * - PostList에 데이터를 전달하여 UI 렌더링
 */

export default function PostListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const sort = searchParams.get("sort") || "time";

  // 정렬 기준 검증 함수
  const isValidSort = (sort) => {
    const validSorts = ["time", "name"];
    return validSorts.includes(sort);
  };

  // 잘못된 입력 처리
  if (isNaN(currentPage) || currentPage < 1 || !isValidSort(sort)) {
    return <PostListError message="잘못된 페이지 번호나 정렬 기준입니다. URL을 확인해주세요." />;
  }

  // 반응형 아이템 개수 가져오기
  const itemsPerPage = useItemPerPage();

  // React Query로 데이터 패칭
  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects", currentPage, itemsPerPage, sort],
    queryFn: () => fetchSubjects(currentPage, itemsPerPage, sort),
    keepPreviousData: true, // 이전 데이터 유지
    useErrorBoundary: false, // 전역 에러 방지
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

  // 로딩 상태 처리
  if (isLoading) {
    return <PostListLoading />;
  }

  // 빈 데이터 처리
  if (data && data.results.length === 0) {
    return <PostListError message="검색 결과가 없습니다. 다른 조건으로 검색해보세요." />;
  }

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
