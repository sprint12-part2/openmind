import { useParams, useRouteLoaderData } from "react-router-dom";
import {
  FeedCard,
  FeedCardList,
  FeedDeleteButton,
  FeedListHeader,
  FeedListWrapper,
} from "@components/FeedCard";
import useLike from "./useLike";
import useAnswer from "./useAnswer";

export default function Questions({ count, data, mode = "view" }) {
  const userInfo = useRouteLoaderData("post");
  const { id: subjectId } = useParams();
  const { create, update, remove, reject, removeFeed, isPending } = useAnswer();
  const { mutate: reaction } = useLike();

  function handleCreate({ questionId, content }) {
    create({ questionId, content, isRejected: "false" });
  }

  function handleUpdate({ answerId, content }) {
    update({
      answerId,
      content,
      isRejected: "false",
    });
  }

  function handleDelete({ questionId, answerId }) {
    remove({ questionId, answerId });
  }

  function handleReject({ questionId, answerId }) {
    reject({
      questionId,
      answerId,
      content: "reject",
      isRejected: true,
    });
  }

  function handleLike({ questionId, type }) {
    reaction({ questionId, type });
  }

  function handleDeleteFeed() {
    removeFeed({ subjectId });
  }

  return (
    <>
      {mode === "answer" && <FeedDeleteButton onClick={handleDeleteFeed} />}
      <FeedListWrapper>
        <FeedListHeader count={count} />
        <FeedCardList data={data}>
          {(question) => (
            <FeedCard
              key={question.id}
              isPending={isPending}
              question={question}
              mode={mode}
              feedOwner={userInfo}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onReject={handleReject}
              onLike={handleLike}
            />
          )}
        </FeedCardList>
      </FeedListWrapper>
    </>
  );
}
