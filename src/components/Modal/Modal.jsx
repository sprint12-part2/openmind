import { motion } from "motion/react";
import { Icon } from "@components/Icon";
import styles from "./Modal.module.css";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import usePreventScroll from "./usePreventScroll";
import { createPortal } from "react-dom";

/**
 * @param {object} props
 * @param {function} props.handleToggleModal - 모달 토글 (열기/닫기)
 * @param {string} props.title - 모달 타이틀
 * @param {string} props.icon - 모달 아이콘명
 * @param {children} props.children - 모달 콘텐츠
 */

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const container = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1 },
};

export const Modal = forwardRef(function Modal({ title, icon, children }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  //const { preventScroll, allowScroll } = usePreventScroll();

  useEffect(() => {
    if (isOpen) {
      scrollPositionRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflowY = "";
      if (scrollPositionRef.current) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    };
  }, [isOpen]);

  useImperativeHandle(ref, function () {
    return {
      open() {
        setIsOpen(true);
      },
      close() {
        setIsOpen(false);
      },
    };
  });

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
