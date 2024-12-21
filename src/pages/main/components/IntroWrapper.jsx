import styles from "./IntroWrapper.module.css";

function IntroWrapper({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}

export default IntroWrapper;
