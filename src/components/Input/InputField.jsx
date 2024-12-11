import styles from "./InputField.module.css";

export function InputField({ value, onChange, ...props }) {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      className={styles.input}
      type="text"
      placeholder="이름을 입력하세요"
    />
  );
}
