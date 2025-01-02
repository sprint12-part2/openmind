import { useParams, useRouteLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useQuestions from "./hooks/useQuestions";
import useSubject from "./hooks/useSubject";
import {
  QuestionForm,
  FeedList,
  FeedListHeader,
  FeedCardList,
  FeedCard,
} from "@components/FeedCard";
import { Message } from "./components/Message";

export default function PostDetailPage() {
  const { id } = useParams();
  const subjectId = Number(id);

  // 피드 정보 (loader 데이터)
  const userInfo = useRouteLoaderData("post");

  // 질문리스트 패칭훅
  const { count, results, ref, error, isLoading, isFetchingNextPage } = useQuestions({
    subjectId,
    itemPerPage: 6,
  });

  // 질문, 답변 핸들링 훅
  const { questionHandler, answerHandler } = useSubject(subjectId);

  if (error) {
    return <Message>질문을 가져오는중에 문제가 생겼습니다.</Message>;
  }

  if (isLoading) {
    return <Message>질문을 가져오는 중입니다.</Message>;
  }

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{userInfo?.name}님의 피드 | OPENMIND</title>
        <meta name="description" content={`${userInfo?.name}님에게 익명으로 질문해주세요.`} />
      </Helmet>
      <QuestionForm
        feedOwner={userInfo}
        onSubmit={questionHandler.createQuestion}
        isPending={questionHandler.isQuestionPending}
      />
      <FeedList>
        <FeedListHeader count={count} />
        <FeedCardList data={results}>
          {(question) => (
            <FeedCard
              key={question.id}
              mode="view"
              question={question}
              feedOwner={userInfo}
              {...questionHandler}
              {...answerHandler}
            />
          )}
        </FeedCardList>
      </FeedList>
      <div ref={ref}>{isFetchingNextPage && <Message>더 불러오는 중입니다...</Message>}</div>
    </>
  );
}
