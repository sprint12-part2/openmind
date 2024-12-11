import React, { useState } from "react";
import { Pagination } from "@components/Pagination";

export default function CharieSample() {
  // 현재 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 100; // 총 데이터 개수
  const itemsPerPage = 8; // 한 페이지당 표시할 데이터 개수

  // 페이지 변경 시 호출되는 함수
  function handlePageChange(page) {
    console.log(`현재 페이지: ${page}`); // 변경된 페이지 출력
    setCurrentPage(page); // 현재 페이지 상태 업데이트
  }

  return (
    <div>
      <h1>Pagination Test</h1>
      {/* Pagination 컴포넌트에 현재 페이지 상태 및 변경 함수 전달 */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage} // 현재 페이지 상태 전달
        onPageChange={handlePageChange} // 페이지 변경 함수 전달
      />
    </div>
  );
}
