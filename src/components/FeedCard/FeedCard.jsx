import { useRef } from "react";
import { MoreMenu, Reaction } from "@components/ui";
import { Question, Answer, Reactions, FeedCardWrapper } from "@components/FeedCard";

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
        {mode === "answer" && (
          <MoreMenu>
            <MoreMenu.Item icon="reject" onClick={handleReject} disabled={answer?.isRejected}>
              거절하기
            </MoreMenu.Item>
            <MoreMenu.Item icon="edit" onClick={handleModify}>
              수정하기
            </MoreMenu.Item>
            <MoreMenu.Item icon="close" onClick={handleDelete} disabled={!answer}>
              삭제하기
            </MoreMenu.Item>
          </MoreMenu>
        )}
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
      <Reactions>
        <Reaction type="like" count={like} onClick={() => onLike({ questionId, type: "like" })} />
        <Reaction
          type="dislike"
          count={dislike}
          onClick={() => onLike({ questionId, type: "dislike" })}
        />
      </Reactions>
    </FeedCardWrapper>
  );
}
