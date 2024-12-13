import styles from "./FloatingButton.module.css";
export function FloatingButton({
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
    </button>
  );
}
