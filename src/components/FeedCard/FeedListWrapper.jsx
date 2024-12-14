import styles from "./FeedListWrapper.module.css";

export function FeedListWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
