export function getItemsPerPage() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    return 6; // 모바일: 한 페이지에 6개
  } else if (screenWidth <= 1200) {
    return 6; // 태블릿: 한 페이지에 6개
  } else {
    return 8; // PC: 한 페이지에 8개
  }
}
