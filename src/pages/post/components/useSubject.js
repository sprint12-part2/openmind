import { useFeed } from "@context/FeedContext";
import useAnswer from "./useAnswer";
import useQuestion from "./useQuestion";

export default function useSubject(subjectId) {
  const { removeFeed } = useFeed();

  const {
    create: createQuestion,
    remove: removeQuestion,
    reaction: reactionQuestion,
    isPending: isQuestionPending,
  } = useQuestion(subjectId);

  const {
    create: createAnswer,
    update: updateAnswer,
    remove: removeAnwer,
    reject: rejectAnswer,
    isPending: isAnswerPending,
  } = useAnswer(subjectId);

  return {
    subjectHandler: {
      removeFeed,
    },

    questionHandler: {
      createQuestion,
      removeQuestion,
      reactionQuestion,
      isQuestionPending,
    },
    answerHandler: {
      createAnswer,
      updateAnswer,
      removeAnwer,
      rejectAnswer,
      isAnswerPending,
    },
  };
}
