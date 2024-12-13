import { useState } from "react";
import { InputTextarea } from "@components/Input";
import styles from "./AnswerForm.module.css";

export function AnswerForm({ initialValue = "", onSubmit, onCancel }) {
  const [value, setValue] = useState(initialValue);

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }

  function handleReset() {
    setValue(initialValue);
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputTextarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="답변을 입력해주세요"
      />
      <button type="submit" className={styles.button} disabled={!value}>
        {initialValue ? "수정" : "작성"}
      </button>
      <button type="button" onClick={handleReset} className={styles.reset}>
        취소
      </button>
    </form>
  );
}
