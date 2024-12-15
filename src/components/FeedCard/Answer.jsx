import { AnswerForm } from "@components/FeedCard";
import { Avatar } from "@components/Avatar";
import { fromNow } from "@util/format";
import styles from "./Answer.module.css";
import { forwardRef, useImperativeHandle, useState } from "react";

export const Answer = forwardRef(function Answer(
  { questionId, answer, user, mode, onCreate, onUpdate, isPending },
  ref,
) {
  const [isEdit, setIsEdit] = useState(false);
  const { id: answerId, createdAt, isRejected, content } = answer || {};
  const { name, imageSource } = user;
  const isEditMode = mode === "answer" && isEdit;

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
    if (isRejected && !isEditMode) {
      return <div className={styles.reject}>답변 거절</div>;
    }

    if (isEditMode) {
      return (
        <AnswerForm
          initialValue={content}
          questionId={questionId}
          answerId={answerId}
          onSubmit={onUpdate}
          onCancel={handleCancel}
          isPending={isPending}
        />
      );
    }

    return (
      content || (
        <AnswerForm
          questionId={questionId}
          answerId={answerId}
          onSubmit={onCreate}
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
