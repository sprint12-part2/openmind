import styles from "./FeedDeleteButton.module.css";

export function FeedDeleteButton({ ...props }) {
  return (
    <div className={styles.controls}>
      <button className={styles.button} {...props}>
        삭제하기
      </button>
    </div>
  );
}
