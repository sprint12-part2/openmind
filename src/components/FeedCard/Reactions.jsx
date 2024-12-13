import styles from "./Reactions.module.css";

export function Reactions({ children }) {
  return <footer className={styles.footer}>{children}</footer>;
}
