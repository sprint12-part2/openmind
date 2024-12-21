import { useRef, useState } from "react";
import { Modal, InputTextarea, Avatar, FloatingButton, LinkButton } from "@components/ui";
import { Notify } from "@components/Toast";
import styles from "./QuestionForm.module.css";
import { MESSAGES } from "@constants/messages";

export function QuestionForm({ feedOwner, onSubmit, isPending }) {
  const { name, imageSource } = feedOwner;
  const [content, setContent] = useState("");
  const modalRef = useRef(null);

  const handleToggleModal = () => {
    setContent("");
    modalRef.current.open();
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) return Notify({ type: "error", message: MESSAGES.QUESTION.ERROR.EMPTY });

    try {
      await onSubmit({ content });
      Notify({ type: "success", message: MESSAGES.QUESTION.SUCCESS.CREATE });
      modalRef.current.closeAndScrollTop();
    } catch (error) {
      console.log(error);
      Notify({ type: "error", message: MESSAGES.QUESTION.ERROR.CREATE });
    }
  }

  return (
    <>
      <FloatingButton type="button" onClick={handleToggleModal} className={styles.floatButton}>
        질문 작성<em>하기</em>
      </FloatingButton>
      <Modal
        ref={modalRef}
        handleToggleModal={handleToggleModal}
        title="질문을 작성하세요"
        icon="message"
      >
        <div className={styles.user}>
          <span className={styles.to}>To.</span>
          <Avatar src={imageSource} alt={name} size={28} />
          <span className={styles.name}>{name}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <InputTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="질문을 입력해주세요"
          />
          <LinkButton
            type="submit"
            color="secondary"
            disabled={!content || isPending}
            className={styles.button}
          >
            질문 보내기
          </LinkButton>
        </form>
      </Modal>
    </>
  );
}
