import { useRouteLoaderData } from "react-router-dom";
import { FeedCard, FeedCardList, FeedListHeader, FeedListWrapper } from "@components/FeedCard";
import useLike from "./useLike";
import useAnswer from "./useAnswer";

export default function Questions({ count, data, mode = "view" }) {
  const userInfo = useRouteLoaderData("post");
  const { create, update, remove, reject, isPending } = useAnswer();
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

  return (
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
  );
}
