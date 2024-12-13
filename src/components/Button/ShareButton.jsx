// import { Icon } from "@components/Icon";
import styles from "./ShareButton.module.css";
export function ShareButton({
  onClick,
  children,
  icon = "",
  color = "",
  // variant = "solid",
  disabled = false,
}) {
  const buttonStyle = {
    backgroundColor: color,
  };
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      style={buttonStyle}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
