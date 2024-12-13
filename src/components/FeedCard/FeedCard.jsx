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
  onDislike,
}) {
  const { content, like, dislike, createdAt, answer } = question;
  const [isEdit, setIsEdit] = useState(false);

  function handleReject() {
    setIsEdit(false);
    onReject();
  }

  function handleModify() {
    setIsEdit(true);
  }

  function handleCancel() {
    setIsEdit(false);
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
            <MoreMenu.Item icon="close" onClick={onDelete}>
              삭제하기
            </MoreMenu.Item>
          </MoreMenu>
        )}
      </Question>
      <Answer
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
        <Reaction type="like" count={like} onClick={onLike} />
        <Reaction type="dislike" count={dislike} onClick={onDislike} />
      </Reactions>
    </FeedCardWrapper>
  );
}
