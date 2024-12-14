import { Icon } from "@components/Icon";
import styles from "./Modal.module.css";

/**
 * @param {object} props
 * @param {function} props.handleToggleModal - 모달 토글 (열기/닫기)
 * @param {string} props.title - 모달 타이틀
 * @param {string} props.icon - 모달 아이콘명
 * @param {children} props.children - 모달 콘텐츠
 */

export function Modal({ handleToggleModal, title, icon, children }) {
  if (!handleToggleModal) return null;

  return (
    <>
      <div className={styles["modal-overlay"]} onClick={handleToggleModal}>
        <div
          className={styles["modal-container"]}
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
        </div>
      </div>
    </>
  );
}
