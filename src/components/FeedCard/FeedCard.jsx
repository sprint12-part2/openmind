import { useRef } from "react";
import { Question, Answer, Reactions } from "@components/FeedCard";
import { Notify } from "@components/Toast";
import { MoreMenu } from "@components/Dropdown";
import styles from "./FeedCard.module.css";

export function FeedCard({
  mode,
  question,
  feedOwner,
  removeQuestion,
  reactionQuestion,
  createAnswer,
  updateAnswer,
  removeAnwer,
  rejectAnswer,
  isAnswerPending,
}) {
  const { id: questionId, content, like, dislike, createdAt, answer } = question;
  const answerRef = useRef(null);

  async function handleCreateAnswer({ content }) {
    try {
      await createAnswer({ questionId, content, isRejected: "false" });
      Notify({ type: "success", message: "답변을 작성했습니다." });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: "문제가 생겨, 작성에 실패했습니다." });
    }
  }

  async function handleUpdateAnswer({ content }) {
    try {
      await updateAnswer({
        answerId: answer?.id,
        content,
        isRejected: "false",
      });
      Notify({ type: "success", message: "답변을 수정했습니다." });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: "문제가 생겨, 수정에 실패했습니다." });
    }
  }

  async function handleRejectAnswer() {
    answerRef.current.closeEdit();

    try {
      await rejectAnswer({
        questionId,
        answerId: answer?.id,
        content: "reject",
        isRejected: true,
      });
      Notify({ type: "success", message: "거절했습니다." });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: "문제가 생겨, 거절에 실패했습니다." });
    }
  }

  async function handleRemoveAnswer() {
    if (!confirm("정말 답변을 삭제할까요?")) return;

    try {
      await removeAnwer({
        questionId,
        answerId: answer?.id,
      });
      Notify({ type: "success", message: "답변을 삭제했습니다." });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: "문제가 생겨, 삭제에 실패했습니다." });
    }
  }

  async function handleRemoveQuestion() {
    if (!confirm("정말 질문을 삭제할까요?")) return;

    try {
      await removeQuestion({
        questionId,
      });
      Notify({ type: "success", message: "질문을 삭제했습니다." });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: "문제가 생겨, 삭제에 실패했습니다." });
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
            <MoreMenu.Item icon="edit" onClick={() => answerRef.current.openEdit()}>
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
        ref={answerRef}
        mode={mode}
        questionId={questionId}
        user={feedOwner}
        answer={answer}
        onCreateAnswer={handleCreateAnswer}
        onUpdateAnswer={handleUpdateAnswer}
        isPending={isAnswerPending}
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
