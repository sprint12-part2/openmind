import styles from "./InputField.module.css";
import clsx from "clsx";

export function InputField({
  value,
  onChange,
  type = "text",
  placeholder = "이름을 입력하세요",
  className,
  ...props
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={clsx(styles.input, className)}
      {...props}
    />
  );
}
