import styles from "./IntroWrapper.module.css";

function IntroWrapper({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default IntroWrapper;
