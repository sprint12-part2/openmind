import clsx from "clsx";
import styles from "./FloatingButton.module.css";
export function FloatingButton({
  onClick,
  children,
  color = "primary",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      className={clsx(styles.button, styles[color], disabled && styles.disabled)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
