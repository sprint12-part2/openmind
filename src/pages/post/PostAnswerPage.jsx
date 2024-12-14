import { useParams } from "react-router-dom";
import useQuestions from "./components/useQuestions";
import { FeedDeleteButton, PostMessage } from "@components/FeedCard";
import Questions from "./components/Questions";

export default function PostAnswerPage() {
  const { id } = useParams();
  const { count, results, ref, error, isLoading, isFetchingNextPage, remove } = useQuestions({
    subjectId: id,
    itemPerPage: 6,
  });

  function handleRemove() {
    remove({ subjectId: id });
  }

  if (error) {
    return <PostMessage>질문을 가져오는중에 문제가 생겼습니다.</PostMessage>;
  }

  if (isLoading) {
    return <PostMessage>질문을 가져오는 중입니다.</PostMessage>;
  }

  return (
    <>
      <FeedDeleteButton onClick={handleRemove} />
      <Questions count={count} data={results} mode="answer" />
      <div ref={ref}>
        {isFetchingNextPage ? <PostMessage>더 불러오는 중입니다...</PostMessage> : ""}
      </div>
    </>
  );
}
