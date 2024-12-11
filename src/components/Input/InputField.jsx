import styles from "./InputField.module.css";

export function InputField({
  value,
  onChange,
  type = "text",
  placeholder = "이름을 입력하세요",
  ...props
}) {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={styles.input}
    />
  );
}
