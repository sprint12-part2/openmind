// import { Icon } from "@components/Icon";
import styles from "./LinkButton.module.css";
export const LinkButton = ({ onClick, children }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children}
      {/* <Icon name="arrowRight" size={18}></Icon> */}
    </button>
  );
};
