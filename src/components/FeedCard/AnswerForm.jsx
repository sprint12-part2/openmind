import { useState } from "react";
import { InputTextarea, LinkButton } from "@components/ui";
import styles from "./AnswerForm.module.css";
import { Notify } from "@components/Toast";

export function AnswerForm({
  questionId,
  answerId = null,
  initialValue = "",
  onSubmit,
  onCancel,
  isPending,
}) {
  const [value, setValue] = useState(initialValue);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!value.trim()) return Notify({ type: "error", message: "한글자 이상 입력해주세요" });

    onSubmit({ questionId, answerId, content: value });
    onCancel();
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
      <LinkButton
        color="secondary"
        type="submit"
        className={styles.button}
        disabled={!value || isPending}
      >
        {initialValue ? "수정" : "작성"}
      </LinkButton>
      <button type="button" onClick={handleReset} className={styles.reset}>
        취소
      </button>
    </form>
  );
}
