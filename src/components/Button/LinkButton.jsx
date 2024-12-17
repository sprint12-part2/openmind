// import { Icon } from "@components/Icon";
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
  ...props
}) {
  return (
    <button
      className={clsx(styles.button, styles[color], disabled && styles.disabled, className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
      {/* <Icon name="arrowRight" size={18}></Icon> */}
    </button>
  );
}
