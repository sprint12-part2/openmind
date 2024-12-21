import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import useQuestions from "./components/useQuestions";
import {
  FeedDeleteButton,
  FeedList,
  FeedListHeader,
  FeedCardList,
  FeedCard,
  Message,
} from "@components/FeedCard";
import useSubject from "./components/useSubject";
import { Notify } from "@components/Toast";
import { MESSAGES } from "@constants/messages";

export default function PostAnswerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 피드 정보 (loader 데이터)
  const userInfo = useRouteLoaderData("post");

  // 질문리스트 패칭훅
  const { count, results, ref, error, isLoading, isFetchingNextPage } = useQuestions({
    subjectId: id,
    itemPerPage: 6,
  });

  // 질문, 답변 핸들링 훅
  const {
    subjectHandler: { removeFeed },
    questionHandler,
    answerHandler,
  } = useSubject(id);

  async function handleDeleteSubject() {
    if (!confirm(MESSAGES.SUBJECT.CONFIRM)) return;

    try {
      await removeFeed(id);
      Notify(
        { type: "success", message: MESSAGES.SUBJECT.SUCCESS.DELETE },
        {
          onClose: () => {
            window.location.replace("/");
          },
        },
      );
    } catch (error) {
      console.error(error);
      Notify({ type: "error", message: MESSAGES.SUBJECT.ERROR.DELETE });
    }
  }

  if (error) {
    return <Message>질문을 가져오는중에 문제가 생겼습니다.</Message>;
  }

  if (isLoading) {
    return <Message>질문을 가져오는 중입니다.</Message>;
  }

  return (
    <>
      <FeedDeleteButton onClick={handleDeleteSubject} />
      <FeedList>
        <FeedListHeader count={count} />
        <FeedCardList data={results}>
          {(question) => (
            <FeedCard
              key={question.id}
              mode="answer"
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
