import styles from "./PostMessage.module.css";

export function PostMessage({ children }) {
  return <div className={styles.message}>{children}</div>;
}
