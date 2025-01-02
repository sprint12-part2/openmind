import { useState } from "react";
import { Question, Answer, Reactions } from "@components/FeedCard";
import { Notify } from "@components/Toast";
import { MoreMenu } from "@components/Dropdown";
import styles from "./FeedCard.module.css";
import { MESSAGES } from "@constants/messages";

export function FeedCard({
  mode,
  question,
  feedOwner,
  removeQuestion,
  reactionQuestion,
  createAnswer,
  updateAnswer,
  removeAnswer,
  rejectAnswer,
  isAnswerPending,
}) {
  const { id: questionId, content, like, dislike, createdAt, answer } = question;
  const [isEdit, setIsEdit] = useState(false);

  async function handleCreateAnswer({ content }) {
    try {
      await createAnswer({ questionId, content, isRejected: "false" });
      Notify({ type: "success", message: MESSAGES.ANSWER.SUCCESS.CREATE });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: MESSAGES.ANSWER.ERROR.CREATE });
    }
  }

  async function handleUpdateAnswer({ content }) {
    try {
      await updateAnswer({
        answerId: answer?.id,
        content,
        isRejected: "false",
      });
      Notify({ type: "success", message: MESSAGES.ANSWER.SUCCESS.UPDATE });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: MESSAGES.ANSWER.ERROR.UPDATE });
    }
  }

  async function handleRejectAnswer() {
    setIsEdit(false);

    try {
      await rejectAnswer({
        questionId,
        answerId: answer?.id,
        content: "reject",
        isRejected: true,
      });
      Notify({ type: "success", message: MESSAGES.ANSWER.SUCCESS.REJECT });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: MESSAGES.ANSWER.ERROR.REJECT });
    }
  }

  async function handleRemoveAnswer() {
    if (!confirm(MESSAGES.ANSWER.CONFIRM)) return;

    try {
      await removeAnswer({
        questionId,
        answerId: answer?.id,
      });
      Notify({ type: "success", message: MESSAGES.ANSWER.SUCCESS.DELETE });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: MESSAGES.ANSWER.ERROR.DELETE });
    }
  }

  async function handleRemoveQuestion() {
    if (!confirm(MESSAGES.QUESTION.CONFIRM)) return;

    try {
      await removeQuestion({
        questionId,
      });
      Notify({ type: "success", message: MESSAGES.QUESTION.SUCCESS.DELETE });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: MESSAGES.QUESTION.ERROR.DELETE });
    }
  }

  async function handleReaction(type) {
    reactionQuestion({ questionId, type });
  }

  return (
    <div className={styles.card}>
      <Question status={!!answer} createdAt={createdAt} content={content}>
        {mode === "answer" && (
          <MoreMenu>
            <MoreMenu.Item icon="reject" onClick={handleRejectAnswer} disabled={answer?.isRejected}>
              거절하기
            </MoreMenu.Item>
            <MoreMenu.Item icon="edit" onClick={() => setIsEdit(true)} disabled={!answer}>
              수정하기
            </MoreMenu.Item>
            <MoreMenu.Item icon="close" onClick={handleRemoveAnswer} disabled={!answer}>
              답변삭제
            </MoreMenu.Item>
            <MoreMenu.Item icon="close" onClick={handleRemoveQuestion}>
              질문삭제
            </MoreMenu.Item>
          </MoreMenu>
        )}
      </Question>
      <Answer
        mode={mode}
        questionId={questionId}
        user={feedOwner}
        answer={answer}
        onCreateAnswer={handleCreateAnswer}
        onUpdateAnswer={handleUpdateAnswer}
        isPending={isAnswerPending}
        isEdit={isEdit}
        onCloseEdit={() => setIsEdit(false)}
      />
      <Reactions
        questionId={questionId}
        like={like}
        dislike={dislike}
        onReaction={handleReaction}
      />
    </div>
  );
}
