import styles from "./InputTextarea.module.css";
import clsx from "clsx";

export function InputTextarea({
  value,
  onChange,
  placeholder = "이름을 입력하세요",
  rows = 6, // 텍스트 줄 수
  maxLength = 500, // 최대 글자 수 입니다.
  className,
  ...props
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className={clsx(styles.textarea, className)}
      {...props}
    />
  );
}
