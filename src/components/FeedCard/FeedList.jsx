import styles from "./FeedList.module.css";

export function FeedList({ children }) {
  return <div className={styles.container}>{children}</div>;
}
