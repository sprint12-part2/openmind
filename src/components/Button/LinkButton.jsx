import clsx from "clsx";
import styles from "./LinkButton.module.css";
export function LinkButton({
  onClick,
  children,
  className,
  color = "primary",
  disabled = false,
  type = "button",
  size = "md",
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
