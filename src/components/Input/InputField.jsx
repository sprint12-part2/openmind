import styles from "./InputField.module.css";

export function InputField() {
  return <input className={styles.input} placeholder="이름을 입력하세요" />;
}
