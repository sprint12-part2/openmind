import { useParams } from "react-router-dom";
import { PostMessage, QuestionForm } from "@components/FeedCard";
import useQuestions from "./components/useQuestions";
import Questions from "./components/Questions";

export default function PostDetailPage() {
  const { id } = useParams();
  const { count, results, ref, error, isLoading, isFetchingNextPage } = useQuestions({
    subjectId: id,
    itemPerPage: 6,
  });

  if (error) {
    return <PostMessage>질문을 가져오는중에 문제가 생겼습니다.</PostMessage>;
  }

  if (isLoading) {
    return <PostMessage>질문을 가져오는 중입니다.</PostMessage>;
  }

  return (
    <>
      <QuestionForm />
      <Questions count={count} data={results} />
      <div ref={ref}>
        {isFetchingNextPage ? <PostMessage>더 불러오는 중입니다...</PostMessage> : ""}
      </div>
    </>
  );
}
