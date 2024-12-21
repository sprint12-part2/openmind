import styles from "./MainPageInner.module.css";

function MainPageInner({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default MainPageInner;
