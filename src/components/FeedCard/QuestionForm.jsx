import { useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import useQuestion from "../../pages/post/components/useQuestion";
import { Modal, InputTextarea, Avatar } from "@components/ui";
import usePreventScroll from "@components/Modal/usePreventScroll";
import styles from "./QuestionForm.module.css";

export function QuestionForm() {
  const { id } = useParams();
  const { name, imageSource } = useRouteLoaderData("post");
  const [question, setQuestion] = useState("");
  const [isModal, setIsModal] = useState(false);
  const { mutate, isPending } = useQuestion();
  const { preventScroll, allowScroll } = usePreventScroll();

  const handleToggleModal = () => {
    setQuestion("");
    setIsModal(!isModal);
    isModal ? allowScroll() : preventScroll();
  };

  async function handleSubmit(e) {
    e.preventDefault();
    mutate({
      id,
      question,
    });
    handleToggleModal();
  }

  return (
    <>
      <button type="button" onClick={handleToggleModal} className={styles.floatButton}>
        질문 작성<em>하기</em>
      </button>
      {isModal && (
        <Modal handleToggleModal={handleToggleModal} title="질문을 작성하세요" icon="message">
          <div className={styles.user}>
            <span className={styles.to}>To.</span>
            <Avatar src={imageSource} alt={name} size={28} />
            <span className={styles.name}>{name}</span>
          </div>
          <form onSubmit={handleSubmit}>
            <InputTextarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="질문을 입력해주세요"
            />
            <button type="submit" disabled={!question || isPending} className={styles.button}>
              질문 보내기
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
