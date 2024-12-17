import clsx from "clsx";
import styles from "./FloatingButton.module.css";
export function FloatingButton({
  onClick,
  children,
  className,
  size = "md",
  color = "primary",
  type = "button",
  disabled = false,
  responsive = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[color],
        styles[size],
        disabled && styles.disabled,
        responsive && styles.responsive,
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
