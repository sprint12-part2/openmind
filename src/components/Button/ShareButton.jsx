import { Icon } from "@components/Icon";
import clsx from "clsx";
import styles from "./ShareButton.module.css";
export function ShareButton({
  onClick,
  children,
  className,
  icon = "",
  color = "",
  type = "button",
  disabled = false,
  iconColor = "#ffffff",
}) {
  const buttonStyle = {
    backgroundColor: color,
  };
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled, className)}
      style={buttonStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={icon} color={iconColor} size={18} />}
      {children}
    </button>
  );
}
