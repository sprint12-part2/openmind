import { useRef } from "react";
import { Question, Answer, Reactions, FeedCardWrapper, AnswerMenu } from "@components/FeedCard";

export function FeedCard({
  mode,
  question,
  feedOwner,
  isPending,
  onCreateAnswer,
  onUpdateAnswer,
  onDeleteAnswer,
  onRejectAnswer,
  onLike,
}) {
  const { id: questionId, content, like, dislike, createdAt, answer } = question;
  const answerRef = useRef(null);

  function handleReject() {
    answerRef.current.closeEdit();
    onRejectAnswer({
      questionId,
      answerId: answer?.id,
    });
  }

  function handleModify() {
    answerRef.current.openEdit();
  }

  function handleDelete() {
    onDeleteAnswer({
      questionId,
      answerId: answer?.id,
    });
  }

  return (
    <FeedCardWrapper>
      <Question status={!!answer} createdAt={createdAt} content={content}>
        <AnswerMenu
          mode={mode}
          answer={answer}
          onReject={handleReject}
          onModify={handleModify}
          onDelete={handleDelete}
        />
      </Question>
      <Answer
        ref={answerRef}
        questionId={questionId}
        isPending={isPending}
        answer={answer}
        user={feedOwner}
        mode={mode}
        onCreate={onCreateAnswer}
        onUpdate={onUpdateAnswer}
      />
      <Reactions questionId={questionId} like={like} dislike={dislike} onLike={onLike} />
    </FeedCardWrapper>
  );
}
