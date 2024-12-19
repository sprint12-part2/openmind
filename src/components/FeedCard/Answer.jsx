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
  const isEditMode = mode === "answer" && isEdit;

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
    // 거절상태일 경우
    if (isRejected && !isEditMode) {
      return <div className={styles.reject}>답변 거절</div>;
    }

    // 수정하기를 누를 경우
    if (isEditMode) {
      return (
        <AnswerForm
          initialValue={content}
          questionId={questionId}
          answerId={answerId}
          onSubmit={onUpdateAnswer}
          onCancel={handleCancel}
          isPending={isPending}
        />
      );
    }

    // 컨텐츠가 있으면 컨텐츠 노출, 없으면 작성폼 노출
    return (
      content || (
        <AnswerForm
          questionId={questionId}
          answerId={answerId}
          onSubmit={onCreateAnswer}
          onCancel={handleCancel}
          isPending={isPending}
        />
      )
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
          {createdAt && <span className={styles.date}>{fromNow(createdAt)}</span>}
        </div>
        <div className={styles.content}>{renderAnswerContent()}</div>
      </div>
    </div>
  );
});
