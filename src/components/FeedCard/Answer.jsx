import { AnswerForm } from "@components/FeedCard";
import { Avatar } from "@components/Avatar";
import { fromNow } from "@util/format";
import styles from "./Answer.module.css";

export function Answer({
  questionId,
  answer,
  user,
  mode,
  isEdit,
  onCreate,
  onUpdate,
  onCancel,
  isPending,
}) {
  const { id: answerId, createdAt, isRejected, content } = answer || {};
  const { name, imageSource } = user;
  const isEditMode = mode === "answer" && isEdit;

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
          onCancel={onCancel}
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
          onCancel={onCancel}
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
}
