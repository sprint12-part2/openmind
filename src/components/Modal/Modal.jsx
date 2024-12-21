import { motion } from "motion/react";
import { Icon } from "@components/Icon";
import styles from "./Modal.module.css";
import { forwardRef, useImperativeHandle, useState } from "react";
import usePreventScroll from "./usePreventScroll";
import { createPortal } from "react-dom";

/**
 * 모달 오버레이 애니메이션의 상태를 정의한 객체입니다.
 * @type {Object}
 */
const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/**
 * 모달 컨테이너 애니메이션의 상태를 정의한 객체입니다.
 * @type {Object}
 */
const container = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1 },
};

/**
 * 모달 컴포넌트입니다. 모달 오버레이와 콘텐츠를 렌더링하며,
 * 부모 컴포넌트에서 제공된 메서드를 통해 모달을 열고 닫을 수 있습니다.
 *
 * @component
 * @example
 * const modalRef = useRef(null);
 * <Modal ref={modalRef} title="모달 제목" icon="message">모달 내용</Modal>;
 *
 * modalRef.current.open(); // 모달 열기
 * modalRef.current.close(); // 모달 닫기
 *
 * @param {Object} props - Modal 컴포넌트의 속성입니다.
 * @param {string} [props.title] - 모달 헤더에 표시할 제목입니다.
 * @param {string} [props.icon] - 헤더에 표시할 아이콘의 이름입니다. 예: "info", "close" 등.
 * @param {React.ReactNode} [props.children] - 모달의 본문에 표시할 콘텐츠입니다.
 *
 * @returns {React.Component|null} 열려있을 경우 렌더링되는 Modal 컴포넌트를 반환하고, 그렇지 않으면 null을 반환합니다.
 */
export const Modal = forwardRef(function Modal({ title, icon, children }, ref) {
  /**
   * 모달의 열림/닫힘 상태를 관리하는 상태입니다.
   * @type {boolean}
   */
  const [isOpen, setIsOpen] = useState(false);
  const [forceScrollTop, setForceScrollTop] = useState(false);
  /**
   * 모달이나 특정 UI 요소가 열릴 때 스크롤을 잠그는 커스텀 훅입니다.
   */
  usePreventScroll(isOpen, forceScrollTop);

  /**
   * 부모 컴포넌트에게 open과 close 메서드를 전달하기 위한 useImperativeHandle 훅 사용
   */
  useImperativeHandle(ref, function () {
    return {
      open() {
        setIsOpen(true);
      },
      close() {
        setIsOpen(false);
      },
      closeAndScrollTop() {
        setForceScrollTop(true);
        setIsOpen(false);
      },
    };
  });

  // 모달이 열리지 않으면 아무것도 렌더링하지 않음
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <motion.div
      className={styles["modal-overlay"]}
      variants={overlay}
      initial="hidden"
      animate="show"
      onClick={() => setIsOpen(false)}
    >
      <motion.div
        className={styles["modal-container"]}
        variants={container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles["modal-header"]}>
          {icon && (
            <div className={styles["modal-image"]}>
              <Icon name={icon} />
            </div>
          )}
          {title && <div className={styles["modal-title"]}>{title}</div>}
          <button className={styles["modal-close-btn"]} onClick={() => setIsOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className={styles["modal-content"]}>{children}</div>
      </motion.div>
    </motion.div>,
    document.querySelector("#root"),
  );
});
