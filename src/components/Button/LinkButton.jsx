// import { Icon } from "@components/Icon";
import styles from "./LinkButton.module.css";
export function LinkButton({
  onClick,
  children,
  size = "md",
  color = "primary",
  // variant = "solid",
  disabled = false,
}) {
  return (
    <button
      className={`${styles.button} ${styles[size]} ${styles[color]} ${disabled ? styles.disabled : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {/* <Icon name="arrowRight" size={18}></Icon> */}
    </button>
  );
}
