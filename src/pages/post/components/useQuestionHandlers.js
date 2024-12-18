import { useNavigate } from "react-router-dom";
import { useFeed } from "@context/FeedContext";
import useAnswer from "./useAnswer";
import useLike from "./useLike";
import useQuestion from "./useQuestion";
import { Notify } from "@components/Toast";

export default function useQuestionHandlers(subjectId) {
  const {
    create: createQuestion,
    remove: removeQuestion,
    isPending: isQuestionPending,
  } = useQuestion(subjectId);
  const { create, update, remove, reject, isPending: isAnswerPending } = useAnswer(subjectId);
  const { mutate: reaction } = useLike(subjectId);
  const { removeFeed, isLoading: isFeedPending } = useFeed();
  const navigate = useNavigate();

  function handleCreateQuestion({ content }) {
    createQuestion({ content });
  }

  function handleDeleteQuestion({ questionId }) {
    removeQuestion({ questionId });
  }

  function handleCreateAnswer({ questionId, content }) {
    create({ questionId, content, isRejected: "false" });
  }

  function handleUpdateAnswer({ answerId, content }) {
    update({
      answerId,
      content,
      isRejected: "false",
    });
  }

  function handleDeleteAnswer({ questionId, answerId }) {
    remove({ questionId, answerId });
  }

  function handleRejectAnswer({ questionId, answerId }) {
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
    if (!confirm("정말 피드를 삭제하시겠습니까?")) return;

    try {
      await removeFeed(subjectId);
      Notify({ type: "success", message: "피드를 삭제했습니다." });
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: "문제가 생겨 삭제를 실패했습니다." });
    }
  }

  const isPending = isQuestionPending || isAnswerPending || isFeedPending;

  return {
    handlers: {
      onCreateQuestion: handleCreateQuestion,
      onDeleteQuestion: handleDeleteQuestion,
      onCreateAnswer: handleCreateAnswer,
      onUpdateAnswer: handleUpdateAnswer,
      onDeleteAnswer: handleDeleteAnswer,
      onRejectAnswer: handleRejectAnswer,
      onLike: handleLike,
      onDeleteFeed: handleDeleteFeed,
    },
    isPending,
  };
}
