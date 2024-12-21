import styles from "./PostListWrapper.module.css";

export default function PostListWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}
