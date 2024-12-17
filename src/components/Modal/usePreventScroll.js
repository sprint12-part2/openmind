import { useRef, useEffect } from "react";

/**
 * 페이지가 열리거나 모달 등의 UI가 열릴 때 페이지 스크롤을 잠그는 커스텀 훅입니다.
 * `isOpen`이 `true`일 경우 스크롤을 잠그고, `false`일 경우 스크롤을 복원합니다.
 *
 * 스크롤이 잠긴 상태에서 페이지를 이동하려고 하면 위치가 고정됩니다.
 * 모달이나 특정 UI가 닫힐 때 페이지가 원래 있던 위치로 복원됩니다.
 *
 * @param {boolean} isOpen - 모달 또는 UI가 열려 있는 상태인지 나타내는 값. `true`일 경우 스크롤을 잠금, `false`일 경우 스크롤을 복원.
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 * usePreventScroll(isOpen); // 모달이 열릴 때 스크롤을 잠그고, 닫을 때 복원
 */
const usePreventScroll = (isOpen) => {
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    // 스크롤 잠금
    if (isOpen) {
      scrollPositionRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.overflowY = "hidden";
    } else {
      // 스크롤 복원
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollPositionRef.current); // 원래의 위치로 스크롤 복원
    }

    // 컴포넌트 언마운트 시 클린업 작업
    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflowY = "";
      // 스크롤 복원
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [isOpen]);
};

export default usePreventScroll;
