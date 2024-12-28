import { forwardRef, useImperativeHandle, useState } from "react";
import { AnswerForm } from "@components/FeedCard";
import { Avatar } from "@components/Avatar";
import { fromNow } from "@util/format";
import styles from "./Answer.module.css";

export const Answer = forwardRef(function Answer(
  { mode, questionId, user, answer, onCreateAnswer, onUpdateAnswer, isPending },
  ref,
) {
  const [isEdit, setIsEdit] = useState(false);
  const { id: answerId, createdAt, isRejected, content } = answer || {};
  const { name, imageSource } = user;
  const isEditMode = mode === "answer" && isEdit; // 수정모드 : '답변페이지'이면서 수정버튼을 클릭했을 경우
  const isRejectedMode = isRejected && !isEditMode; // 거절모드 : 거절된상태이면서 수정모드가 아닐때
  const isAnswerFormMode = isEditMode || !content; // 답변작성(수정)모드 : 수정버튼을 클릭했거나, 컨텐츠(답변)가 없을때

  // Answer 컴포넌트의 부모가 edit 모드를 컨트롤 할 수 있게 메서드 제공
  useImperativeHandle(ref, () => {
    return {
      openEdit: () => setIsEdit(true),
      closeEdit: () => setIsEdit(false),
    };
  });

  function handleCancel() {
    setIsEdit(false);
  }

  if (!answer && mode === "view") {
    return null;
  }

  function renderAnswerContent() {
    // 거절모드
    if (isRejectedMode) {
      return <div className={styles.reject}>답변 거절</div>;
    }

    return isAnswerFormMode ? (
      <AnswerForm
        initialValue={content}
        questionId={questionId}
        answerId={answerId}
        onSubmit={isEditMode ? onUpdateAnswer : onCreateAnswer}
        onCancel={handleCancel}
        isPending={isPending}
      />
    ) : (
      content
    );
  }

  return (
    <div className={styles.answer}>
      <div className={styles.profile}>
        <Avatar src={imageSource} alt={name} />
      </div>
      <div className={styles.detail}>
        <div className={styles.meta}>
          <span className={styles.name}>{name}</span>
          {createdAt && <span className={styles.date}>{fromNow(createdAt, new Date())}</span>}
        </div>
        <div className={styles.content}>{renderAnswerContent()}</div>
      </div>
    </div>
  );
});
