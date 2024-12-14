import { useState } from "react";
import { MoreMenu, Reaction } from "@components/ui";
import { Question, Answer, Reactions, FeedCardWrapper } from "@components/FeedCard";

export function FeedCard({
  isPending,
  question,
  mode,
  feedOwner,
  onUpdate,
  onCreate,
  onDelete,
  onReject,
  onLike,
}) {
  const { id: questionId, content, like, dislike, createdAt, answer } = question;
  const [isEdit, setIsEdit] = useState(false);

  function handleReject() {
    setIsEdit(false);
    onReject({
      questionId,
      answerId: answer && answer.id,
    });
  }

  function handleModify() {
    setIsEdit(true);
  }

  function handleCancel() {
    setIsEdit(false);
  }

  function handleDelete() {
    onDelete({
      questionId,
      answerId: answer && answer.id,
    });
  }

  function handleLike(e) {
    const type = e.currentTarget.dataset.like;
    onLike({ questionId, type });
  }

  return (
    <FeedCardWrapper>
      <Question status={!!answer} createdAt={createdAt} content={content}>
        {mode === "answer" && (
          <MoreMenu>
            <MoreMenu.Item icon="reject" onClick={handleReject}>
              거절하기
            </MoreMenu.Item>
            <MoreMenu.Item icon="edit" onClick={handleModify}>
              수정하기
            </MoreMenu.Item>
            <MoreMenu.Item icon="close" onClick={handleDelete}>
              삭제하기
            </MoreMenu.Item>
          </MoreMenu>
        )}
      </Question>
      <Answer
        questionId={questionId}
        isPending={isPending}
        answer={answer}
        user={feedOwner}
        mode={mode}
        isEdit={isEdit}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onCancel={handleCancel}
      />
      <Reactions>
        <Reaction type="like" count={like} onClick={handleLike} data-like="like" />
        <Reaction type="dislike" count={dislike} onClick={handleLike} data-like="dislike" />
      </Reactions>
    </FeedCardWrapper>
  );
}
