import {
  FeedCard,
  FeedCardList,
  FeedDeleteButton,
  FeedListHeader,
  FeedListWrapper,
  QuestionForm,
} from "@components/FeedCard";
export default function Questions({ mode = "view", count, data, userInfo, handlers, isPending }) {
  return (
    <>
      {mode === "view" ? (
        <QuestionForm
          feedOwner={userInfo}
          onSubmit={handlers.onCreateQuestion}
          isPending={isPending}
        />
      ) : (
        <FeedDeleteButton onClick={handlers.onDeleteFeed} />
      )}
      <FeedListWrapper>
        <FeedListHeader count={count} />
        <FeedCardList data={data}>
          {(question) => (
            <FeedCard
              key={question.id}
              mode={mode}
              question={question}
              feedOwner={userInfo}
              isPending={isPending}
              {...handlers}
            />
          )}
        </FeedCardList>
      </FeedListWrapper>
    </>
  );
}
