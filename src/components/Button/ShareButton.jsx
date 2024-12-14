// import { Icon } from "@components/Icon";
import clsx from "clsx";
import styles from "./ShareButton.module.css";
export function ShareButton({
  onClick,
  children,
  icon = "",
  color = "",
  type = "button",
  disabled = false,
}) {
  const buttonStyle = {
    backgroundColor: color,
  };
  return (
    <button
      className={clsx(styles.button, disabled && styles.disabled)}
      style={buttonStyle}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}
