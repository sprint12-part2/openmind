import { useState } from "react";
import { Modal, InputTextarea, Avatar, FloatingButton, LinkButton } from "@components/ui";
import usePreventScroll from "@components/Modal/usePreventScroll";
import styles from "./QuestionForm.module.css";

export function QuestionForm({ feedOwner, onSubmit, isPending }) {
  const { name, imageSource } = feedOwner;
  const [content, setContent] = useState("");
  const [isModal, setIsModal] = useState(false);
  const { preventScroll, allowScroll } = usePreventScroll();

  const handleToggleModal = () => {
    setContent("");
    setIsModal(!isModal);
    isModal ? allowScroll() : preventScroll();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ content });
    handleToggleModal();
    window.scrollTo(0, 0);
  }

  return (
    <>
      <FloatingButton type="button" onClick={handleToggleModal} className={styles.floatButton}>
        질문 작성<em>하기</em>
      </FloatingButton>
      {isModal && (
        <Modal handleToggleModal={handleToggleModal} title="질문을 작성하세요" icon="message">
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
      )}
    </>
  );
}
