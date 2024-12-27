import { AnswerForm } from "@components/FeedCard";
import { Avatar } from "@components/Avatar";
import { fromNow } from "@util/format";
import styles from "./Answer.module.css";

export function Answer({
  mode,
  questionId,
  user,
  answer,
  onCreateAnswer,
  onUpdateAnswer,
  isPending,
  isEdit,
  onCloseEdit,
}) {
  const { id: answerId, createdAt, isRejected, content } = answer || {};
  const { name, imageSource } = user;
  const isEditMode = mode === "answer" && isEdit; // 수정모드 : '답변페이지'이면서 수정버튼을 클릭했을 경우
  const isRejectedMode = isRejected && !isEditMode; // 거절모드 : 거절된상태이면서 수정모드가 아닐때
  const isAnswerFormMode = isEditMode || !content; // 답변작성(수정)모드 : 수정버튼을 클릭했거나, 컨텐츠(답변)가 없을때

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
        onCancel={onCloseEdit}
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
          {createdAt && <span className={styles.date}>{fromNow(createdAt)}</span>}
        </div>
        <div className={styles.content}>{renderAnswerContent()}</div>
      </div>
    </div>
  );
}
