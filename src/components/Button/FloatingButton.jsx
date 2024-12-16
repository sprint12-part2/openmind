import clsx from "clsx";
import styles from "./FloatingButton.module.css";
export function FloatingButton({
  onClick,
  children,
  className,
  size = "md",
  floating = true,
  position = { top: "auto", right: "20px", bottom: "20px", left: "auto" },
  color = "primary",
  type = "button",
  disabled = false,
}) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[color],
        styles[size],
        disabled && styles.disabled,
        floating && styles.floating,
        className,
      )}
      style={{
        top: floating ? position.top : "auto",
        right: floating ? position.right : "auto",
        bottom: floating ? position.bottom : "auto",
        left: floating ? position.left : "auto",
      }}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
