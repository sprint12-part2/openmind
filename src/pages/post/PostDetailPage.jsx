import { useEffect } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useFeed } from "@context/FeedContext";
import { PostMessage } from "@components/FeedCard";
import useQuestions from "./components/useQuestions";
import Questions from "./components/Questions";
import useQuestionHandlers from "./components/useQuestionHandlers";

export default function PostDetailPage() {
  const { id } = useParams();
  const userInfo = useRouteLoaderData("post");
  const { count, results, ref, error, isLoading, isFetchingNextPage } = useQuestions({
    subjectId: id,
    itemPerPage: 6,
  });
  const { handlers, isPending } = useQuestionHandlers(id);
  const { saveVisited } = useFeed();

  useEffect(() => {
    if (userInfo) {
      saveVisited(userInfo);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <PostMessage>질문을 가져오는중에 문제가 생겼습니다.</PostMessage>;
  }

  if (isLoading) {
    return <PostMessage>질문을 가져오는 중입니다.</PostMessage>;
  }

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{userInfo?.name}님의 피드 | OPENMIND</title>
        <meta name="description" content={`${userInfo?.name}님에게 익명으로 질문해주세요.`} />
      </Helmet>
      <Questions
        mode="view"
        count={count}
        data={results}
        userInfo={userInfo}
        handlers={handlers}
        isPending={isPending}
      />
      <div ref={ref}>
        {isFetchingNextPage ? <PostMessage>더 불러오는 중입니다...</PostMessage> : ""}
      </div>
    </>
  );
}
