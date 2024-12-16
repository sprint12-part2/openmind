import styles from "./PostList.module.css";
import React, { useState, useEffect } from "react";
import { fetchSubjects } from "@service/Subject";
import { UserCard, Pagination, Select } from "@components/ui";
import { getItemsPerPage } from "./itemPerPage";
import { Link, useSearchParams } from "react-router-dom";

export default function PostList() {
  const [subjects, setSubjects] = useState([]); // 질문자 목록 상태
  const [totalItems, setTotalItems] = useState(0); // 전체 항목 수
  const [itemsPerPage, setItemsPerPage] = useState(() => getItemsPerPage()); // 화면 크기에 맞는 초기값
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 파라미터

  // 현재 페이지와 정렬 기준을 URL에서 가져옴
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // URL에서 현재 페이지 값 가져오고 없으면 1로 설정
  const sort = searchParams.get("sort") || "time"; // URL에서 정렬기준 값 가져오기 (기본값: 최신순)

  // 화면 크기 변화 감지 및 itemsPerPage 업데이트
  useEffect(() => {
    function handleResize() {
      const newItemsPerPage = getItemsPerPage();

      setItemsPerPage((prevItemsPerPage) => {
        if (prevItemsPerPage !== newItemsPerPage) {
          return newItemsPerPage; // 화면 크기가 변경될 때만 itemsPerPage를 업데이트
        }
        return prevItemsPerPage;
      });

      // 페이지 번호 보정
      setSearchParams((prevParams) => {
        const maxPage = Math.ceil(totalItems / newItemsPerPage);
        const currentPage = parseInt(prevParams.get("page") || "1", 10);

        return { ...prevParams, page: currentPage > maxPage ? maxPage : currentPage };
      });
    }

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, [totalItems]); // totalItems 의존성 추가

  // 질문자 목록 가져오기 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await fetchSubjects(currentPage, itemsPerPage, sort);
        setSubjects(data.results); // 받아온 데이터 설정
        setTotalItems(data.count); // 총 데이터 수 설정

        // 페이지 보정 (뒤로 가기 시 최대 페이지 확인)
        const maxPage = Math.ceil(data.count / itemsPerPage);
        if (currentPage > maxPage) {
          setSearchParams({ page: maxPage, sort });
        }
      } catch (err) {
        console.error("질문자 목록을 불러오는 데 실패했습니다.", err); // 에러 로그
      }
    }

    loadSubjects();
  }, [currentPage, itemsPerPage, sort]); // 상태 변경 시 실행

  // 페이지 변경 함수
  function handlePageChange(page) {
    setSearchParams({ page, sort }); // 현재 페이지 변경
  }

  // 정렬 기준 변경 함수
  function handleSortChange(value) {
    setSort(value); // 정렬 기준 업데이트
    setSearchParams({ page: 1, sort: value }); // 정렬 기준 변경 시 첫 페이지로 이동
  }

  // 데이터 출력
  return (
    <div className={styles.container}>
      <div className={styles.sortBar}>
        <Select value={sort} onChange={handleSortChange}>
          <Select.Option value="name">이름순</Select.Option>
          <Select.Option value="time">최신순</Select.Option>
        </Select>
      </div>

      <div className={styles.userCardGrid}>
        {subjects.map((subject) => (
          <Link
            to={`/post/${subject.id}`} // 각 질문자의 질문 목록 페이지로 이동
            key={subject.id}
            aria-label={`${subject.name}의 질문 목록으로 이동`} // 접근성을 위한 설명 추가
          >
            <UserCard
              name={subject.name}
              imageSource={subject.imageSource || "default.jpg"}
              questionCount={subject.questionCount}
            />
          </Link>
        ))}
      </div>

      <div className={styles.paginationBar}>
        <Pagination
          totalItems={totalItems} // 전체 데이터 개수
          itemsPerPage={itemsPerPage} // 페이지 당 데이터 개수
          currentPage={currentPage} // 현재 페이지
          onPageChange={handlePageChange} // 페이지 변경 핸들러
        />
      </div>
    </div>
  );
}
