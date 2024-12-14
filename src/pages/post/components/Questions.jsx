import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import {
  FeedCard,
  FeedCardList,
  FeedDeleteButton,
  FeedListHeader,
  FeedListWrapper,
  QuestionForm,
} from "@components/FeedCard";
import useLike from "./useLike";
import useAnswer from "./useAnswer";
import { useFeed } from "@context/FeedContext";
import { Notify } from "@components/Toast";

export default function Questions({ count, data, mode = "view" }) {
  const userInfo = useRouteLoaderData("post");
  const { id: subjectId } = useParams();
  const { create, update, remove, reject, isPending } = useAnswer();
  const { mutate: reaction } = useLike();
  const { removeFeed } = useFeed();
  const navigate = useNavigate();

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

  async function handleDeleteFeed() {
    try {
      await removeFeed(subjectId);
      Notify({ type: "success", message: "피드를 삭제했습니다." });
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: "문제가 생겨 삭제를 실패했습니다." });
    }
  }

  return (
    <>
      {mode === "view" ? <QuestionForm /> : <FeedDeleteButton onClick={handleDeleteFeed} />}
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
