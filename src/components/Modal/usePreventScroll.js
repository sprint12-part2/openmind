import { useState } from "react";

/**
 * 스크롤 방지와 현재 스크롤 위치를 반환하는 custom hook
 * 스크롤 막기 함수
 * @function preventScroll
 * 스크롤 원래 상태로 되돌리는 함수 (스크롤 막기 해제)
 * @function allowScroll
 */
const usePreventScroll = () => {
  const [prevScrollY, setPrevScrollY] = useState(0);

  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    setPrevScrollY(currentScrollY); // 이전 스크롤 위치를 상태로 저장

    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = "hidden";
  };

  const allowScroll = () => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, prevScrollY); // 이전 스크롤 위치로 이동
  };

  return { preventScroll, allowScroll };
};

export default usePreventScroll;
