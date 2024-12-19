import React from "react";
import { Icon } from "@components/ui";
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
    if (page < 1 || page > totalPages) return; // 페이지 번호가 유효하지 않으면 아무 동작도 하지 않음
    if (onPageChange) onPageChange(page); // 부모 컴포넌트로 변경된 페이지 번호 전달
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
    <nav className={styles.paginationContainer} aria-label="페이지 네비게이션">
      <ul className={styles.paginationList}>
        {currentPage !== 1 && (
          <li>
            <button
              className={styles.arrowButton}
              onClick={handlePreviousGroup}
              aria-label="이전 페이지 그룹으로 이동"
            >
              <Icon name="elbowLeft" className={styles.icon} />
            </button>
          </li>
        )}
        {Array.from({ length: groupEnd - groupStart + 1 }, (_, index) => (
          <li key={groupStart + index}>
            <button
              className={`${styles.pageButton} ${
                currentPage === groupStart + index ? styles.active : ""
              }`}
              onClick={() => handlePageChange(groupStart + index)}
            >
              {groupStart + index}
            </button>
          </li>
        ))}
        {currentPage !== totalPages && (
          <li>
            <button
              className={styles.arrowButton}
              onClick={handleNextGroup}
              aria-label="다음 페이지 그룹으로 이동"
            >
              <Icon name="elbowRight" className={styles.icon} />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
