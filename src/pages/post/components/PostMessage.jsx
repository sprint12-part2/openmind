import styles from "./PostMessage.module.css";

export default function PostMessage({ children }) {
  return <div className={styles.message}>{children}</div>;
}
