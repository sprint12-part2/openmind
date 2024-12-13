import { useState } from "react";
import { MoreMenu, Reaction } from "@components/ui";
import { Question, Answer, Reactions, FeedCardWrapper } from "@components/FeedCard";

export function FeedCard({
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
  const { content, like, dislike, createAt, answer } = question;
  const [isEdit, setIsEdit] = useState(false);

  function handleModify() {
    setIsEdit(true);
  }

  function handleCancel() {
    setIsEdit(false);
  }

  return (
    <FeedCardWrapper>
      <Question status={!!answer} createAt={createAt} content={content}>
        {mode === "answer" && (
          <MoreMenu>
            <MoreMenu.Item icon="reject" onClick={onReject}>
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
