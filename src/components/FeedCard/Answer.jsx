import { AnswerForm } from "@components/FeedCard";
import { Avatar } from "@components/Avatar";
import { fromNow } from "@util/format";
import styles from "./Answer.module.css";

export function Answer({ answer, user, mode, isEdit, onCreate, onUpdate, onCancel }) {
  const { createdAt, isRejected, content } = answer || {};
  const { name, imageSource } = user;
  const isEditMode = mode === "answer" && isEdit;

  if (!answer && mode === "view") {
    return null;
  }

  let answerContent;
  if (isEditMode) {
    answerContent = <AnswerForm initialValue={content} onSubmit={onUpdate} onCancel={onCancel} />;
  } else {
    answerContent = content ? content : <AnswerForm onSubmit={onCreate} />;
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
        <div className={styles.content}>
          {isRejected ? <div className={styles.reject}>답변 거절</div> : answerContent}
        </div>
      </div>
    </div>
  );
}
