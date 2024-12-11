import styles from "./InputTextarea.module.css";

export function InputTextarea({
  value,
  onChange,
  placeholder = "이름을 입력하세요",
  rows = 6, // 텍스트 줄 수
  maxLength = 500, // 최대 글자 수
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className={styles.textarea}
    />
  );
}
