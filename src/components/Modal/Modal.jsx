import { motion } from "motion/react";
import { Icon } from "@components/Icon";
import styles from "./Modal.module.css";

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

export function Modal({ handleToggleModal, title, icon, children }) {
  if (!handleToggleModal) return null;

  return (
    <>
      <motion.div
        className={styles["modal-overlay"]}
        variants={overlay}
        initial="hidden"
        animate="show"
        onClick={handleToggleModal}
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
            <button className={styles["modal-close-btn"]} onClick={handleToggleModal}>
              <Icon name="close" />
            </button>
          </div>
          <div className={styles["modal-content"]}>{children}</div>
        </motion.div>
      </motion.div>
    </>
  );
}
