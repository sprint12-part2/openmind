import React from "react";
import styles from "./Pagination.module.css";

export function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 한 번에 표시할 페이지 번호 수 (그룹 크기)
  const pagesPerGroup = 5;

  // 현재 페이지가 속한 그룹 계산
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  // 현재 그룹의 시작 페이지 번호
  const groupStart = (currentGroup - 1) * pagesPerGroup + 1;

  // 현재 그룹의 끝 페이지 번호
  const groupEnd = Math.min(groupStart + pagesPerGroup - 1, totalPages);

  // 페이지 변경 함수
  function handlePageChange(page) {
    // 페이지 번호가 유효하지 않으면 아무 동작도 하지 않음
    if (page < 1 || page > totalPages) return;

    // 부모 컴포넌트로 변경된 페이지 번호 전달
    if (onPageChange) onPageChange(page);
  }

  // 이전 그룹으로 이동하는 함수
  function handlePreviousGroup() {
    handlePageChange(groupStart - 1); // 이전 그룹의 마지막 페이지로 이동
  }

  // 다음 그룹으로 이동하는 함수
  function handleNextGroup() {
    handlePageChange(groupEnd + 1); // 다음 그룹의 첫 페이지로 이동
  }

  return (
    <div className={styles.paginationContainer}>
      {/* 이전 그룹 버튼 */}
      {currentPage !== 1 && ( // 현재 페이지가 첫 번째 페이지가 아닐 경우만 렌더링
        <button
          className={styles.arrowButton}
          onClick={handlePreviousGroup} // 이전 그룹으로 이동
        >
          &lt; {/* 왼쪽 화살표 */}
        </button>
      )}

      {/* 현재 그룹의 페이지 번호 */}
      {Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => (
        <button
          key={groupStart + index} // 고유 키 설정
          className={`${styles.pageButton} ${
            currentPage === groupStart + index ? styles.active : "" // 현재 페이지 스타일 적용
          }`}
          onClick={() => handlePageChange(groupStart + index)} // 해당 페이지로 이동
        >
          {groupStart + index} {/* 페이지 번호 */}
        </button>
      ))}

      {/* 다음 그룹 버튼 */}
      {currentPage !== totalPages && ( // 현재 페이지가 마지막 페이지가 아닐 경우만 렌더링
        <button
          className={styles.arrowButton}
          onClick={handleNextGroup} // 다음 그룹으로 이동
        >
          &gt; {/* 오른쪽 화살표 */}
        </button>
      )}
    </div>
  );
}
