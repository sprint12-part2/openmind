import React, { useState, useEffect } from "react";
import { Pagination } from "@components/Pagination";
import { fetchSubjects } from "@service/Subject"; // API 함수 임포트

export default function CharieSample() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [subjects, setSubjects] = useState([]); // API로 받아올 질문 대상 목록 상태
  const [totalItems, setTotalItems] = useState(0); // 전체 데이터 개수 상태
  const itemsPerPage = 8; // 한 페이지당 표시할 데이터 개수

  // 현재 페이지 데이터 로드 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        // API 호출: 현재 페이지와 itemsPerPage 전달
        const data = await fetchSubjects(currentPage, itemsPerPage, "time");
        setSubjects(data.results); // 받아온 질문 대상 목록 저장
        setTotalItems(data.count); // 전체 데이터 개수 저장
      } catch (error) {
        console.error("질문 대상 목록을 불러오는 데 실패했습니다:", error);
      }
    }
    loadSubjects(); // 데이터 로드 함수 실행
  }, [currentPage]); // currentPage가 변경될 때마다 실행

  // 페이지 변경 함수
  function handlePageChange(page) {
    console.log(`현재 페이지: ${page}`); // 변경된 페이지 출력
    setCurrentPage(page); // 현재 페이지 상태 업데이트
  }

  return (
    <div>
      <h1>**Pagination Test, 질문 대상 목록 조회**</h1>
      <br />
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>

      {/* Pagination 컴포넌트 */}
      <Pagination
        totalItems={totalItems} // 총 데이터 개수 전달
        itemsPerPage={itemsPerPage} // 한 페이지당 데이터 개수 전달
        currentPage={currentPage} // 현재 페이지 상태 전달
        onPageChange={handlePageChange} // 페이지 변경 함수 전달
      />
    </div>
  );
}
