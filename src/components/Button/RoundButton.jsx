import styles from "./RoundButton.module.css";
export const RoundButton = ({ onClick, children }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
