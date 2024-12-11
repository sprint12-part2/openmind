import { useState } from "react";
import { Badge } from "@components/Badge";
import { Modal } from "@components/Modal";
import usePreventScroll from "@components/Modal/usePreventScroll";

export default function SolSample() {
  /**
   * 답변 상태 뱃지
   */
  const answer = [
    {
      id: 6969,
      questionId: 15356,
      content: "답변해드려요",
      isRejected: false,
      createdAt: "2024-12-09T13:11:31.525185Z",
    },
  ];

  const status = answer && !answer.isRejected ? "completed" : "incomplete";

  /**
   * 모달창
   */
  const [isModal, setIsModal] = useState(false);
  const { preventScroll, allowScroll } = usePreventScroll();

  const handleToggleModal = () => {
    setIsModal(!isModal);
    isModal ? allowScroll() : preventScroll();
  };

  return (
    <>
      {/* 답변 상태 뱃지 */}
      <Badge status={status} />

      {/* 모달창 */}
      <button onClick={handleToggleModal}>모달 열기</button>
      {isModal && (
        <Modal handleToggleModal={handleToggleModal} title="질문을 작성하세요" icon="message">
          <p>To. 😸 아초는고양이</p>
          <div
            style={{
              width: "100%",
              height: "300px",
              marginTop: "15px",
              padding: "20px",
              backgroundColor: "#f9f9f9",
            }}
          >
            질문을 입력해주세요
          </div>
        </Modal>
      )}
    </>
  );
}
