import styles from "./FeedCardWrapper.module.css";

export function FeedCardWrapper({ children }) {
  return <div className={styles.card}>{children}</div>;
}
