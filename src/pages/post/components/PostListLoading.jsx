import styles from "./PostListLoading.module.css";

export function PostListLoading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>데이터를 불러오는 중입니다...</p>
    </div>
  );
}
