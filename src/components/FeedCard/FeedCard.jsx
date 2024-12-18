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
  onDeleteQuestion,
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
    if (!confirm("정말 답변을 삭제할까요?")) return;
    onDeleteAnswer({
      questionId,
      answerId: answer?.id,
    });
  }

  function handleDeleteQuestion() {
    if (!confirm("정말 질문을 삭제할까요?")) return;
    onDeleteQuestion({
      questionId,
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
          onDeleteQuestion={handleDeleteQuestion}
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
