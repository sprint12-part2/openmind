import styles from "./InputTextarea.module.css";

export function InputTextarea({ value, onChange, placeholder = "이름을 입력하세요", rows = 5 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={styles.textarea}
    />
  );
}
