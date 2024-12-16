import styles from "./PostList.module.css";
import React, { useState, useEffect } from "react";
import { fetchSubjects } from "@service/Subject";
import { UserCard, Pagination, Select } from "@components/ui";
import { getItemsPerPage } from "./itemPerPage";
import { Link } from "react-router-dom";

export default function PostList() {
  const [subjects, setSubjects] = useState([]); // 질문자 목록 상태
  const [totalItems, setTotalItems] = useState(0); // 전체 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(() => getItemsPerPage()); //게으른 초기화 방식
  const [sort, setSort] = useState("name"); // 정렬 기준 상태 (기본값: 이름순)

  // 화면 크기 변화 감지 및 itemsPerPage 업데이트
  useEffect(() => {
    function handleResize() {
      setItemsPerPage(getItemsPerPage()); // 화면 크기에 맞는 itemsPerPage 값을 업데이트
    }

    // 브라우저의 크기 조정 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열로 의존성 설정 (최초 렌더링 시에만 실행)

  // 질문자 목록 가져오기 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await fetchSubjects(currentPage, itemsPerPage, sort);
        setSubjects(data.results); // 받아온 데이터 설정
        setTotalItems(data.count); // 총 데이터 수 설정
      } catch (err) {
        console.error("질문자 목록을 불러오는 데 실패했습니다.", err); // 에러 로그
      }
    }

    loadSubjects();
  }, [currentPage, itemsPerPage, sort]); // currentPage, itemsPerPage, sort 변경 시 실행

  // 페이지 변경 함수
  function handlePageChange(page) {
    setCurrentPage(page); // 현재 페이지 변경
  }

  // 정렬 기준 변경 함수
  function handleSortChange(value) {
    setSort(value); // 정렬 기준 업데이트
    setCurrentPage(1); // 정렬 기준 변경 시 첫 페이지로 이동
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
