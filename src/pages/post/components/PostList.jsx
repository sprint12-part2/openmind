import styles from "./PostList.module.css";
import React, { useState, useEffect } from "react";
import { fetchSubjects } from "@service/Subject";
import { UserCard, Pagination } from "@components/ui"; //Pagination 추가

export default function PostList() {
  const [subjects, setSubjects] = useState([]); // 질문자 목록 상태
  const [totalItems, setTotalItems] = useState(0); // 전체 항목 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [itemsPerPage, setItemsPerPage] = useState(8); // 한 페이지에 보여줄 데이터 수 (기본값)

  // 화면 크기에 따라 itemsPerPage 조정
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        setItemsPerPage(6); // 모바일: 한 페이지에 6개
      } else if (screenWidth <= 1200) {
        setItemsPerPage(6); // 태블릿: 한 페이지에 6개
      } else {
        setItemsPerPage(8); // PC: 한 페이지에 8개
      }
    }

    // 초기 실행 및 이벤트 등록
    handleResize();
    window.addEventListener("resize", handleResize);

    // 이벤트 클린업
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 배열로 실행 조건 설정 (최초 렌더링 시 실행)

  // 질문자 목록 가져오기 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        // 현재 페이지와 항목 수, 이름순 정렬 기준으로 질문자 목록 데이터를 가져옵니다.
        const data = await fetchSubjects(currentPage, itemsPerPage, "name");
        setSubjects(data.results); // 받아온 데이터 설정
        setTotalItems(data.count); // 총 데이터 수 설정
      } catch (err) {
        console.error("질문자 목록을 불러오는 데 실패했습니다.", err); // 에러 로그
      }
    }

    loadSubjects();
  }, [currentPage, itemsPerPage]); // currentPage와 itemsPerPage가 변경될 때 실행

  // 페이지 변경 함수
  function handlePageChange(page) {
    setCurrentPage(page); // 현재 페이지 변경
  }

  // 데이터 출력
  return (
    <div className={styles.container}>
      <div className={styles.userCardGrid}>
        {subjects.map((subject) => (
          <UserCard
            key={subject.id}
            name={subject.name}
            imageSource={subject.imageSource || "default.jpg"} // 기본 이미지
            questionCount={subject.questionCount}
          />
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
