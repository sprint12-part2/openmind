import { useState, useEffect } from "react";

// 화면 크기에 따라 항목 수를 계산하는 함수 (훅 외부로 분리)
const calculateItemsPerPage = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth < 662) {
    return 6; // 모바일: 6개
  } else if (screenWidth < 868) {
    return 6; // 태블릿: 6개
  } else {
    return 8; // PC: 8개
  }
};

/**
 * 화면 크기에 따라 한 페이지당 항목 수를 계산하는 커스텀 훅
 * @returns {number} itemsPerPage - 화면 크기에 따른 항목 수
 */
export function useItemPerPage() {
  const [itemsPerPage, setItemsPerPage] = useState(() => calculateItemsPerPage()); // 게으른 초기화 적용

  useEffect(() => {
    // 화면 크기 변경 이벤트 핸들러
    const handleResize = () => {
      setItemsPerPage(calculateItemsPerPage());
    };

    // 윈도우 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return itemsPerPage; // 현재 항목 수 반환
}
