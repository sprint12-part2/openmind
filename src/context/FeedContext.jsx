import { createSubject, deleteSubject } from "@service/Subject";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const FeedContext = createContext();

export const useFeed = () => useContext(FeedContext);

export default function FeedContextProvider({ children }) {
  const [feeds, setFeeds] = useState(() => {
    const saved = localStorage.getItem("feeds");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("feeds", JSON.stringify(feeds));
  }, [feeds]);

  const createFeed = useCallback(async (name) => {
    setIsLoading(true);

    const response = await createSubject({ name });
    setFeeds((prev) => [response, ...prev]);
    setIsLoading(false);
    return response;
  }, []);

  const removeFeed = useCallback(
    async (feedId) => {
      setIsLoading(true);

      await deleteSubject(Number(feedId));
      //setFeeds((prev) => prev.filter((feed) => feed.id !== Number(feedId)));

      // setFeeds가 리랜더를 유발해서 protect router가 한번더 체크됨
      // 오류 메세지(권한이 없습니다.)를 보는게 싫어서 아래와 같은 방법으로 우회

      // 그냥 로컬스토리지를 바로 업데이트하고
      // 사용자쪽에서 앱을 새로고침하도록 유도
      // (앱이 다시 실행되면서 컨텍스트가 다시 실행되어, 초기값으로 로컬스토리지값을 슴)

      const data = feeds.filter((feed) => feed.id !== Number(feedId));
      localStorage.setItem("feeds", JSON.stringify(data));
      setIsLoading(false);
    },
    [feeds],
  );

  const hasFeed = useCallback(
    (feedId) => {
      return feeds.find((feed) => feed.id === Number(feedId));
    },
    [feeds],
  );

  const ctxValue = {
    isLoading,
    feeds,
    createFeed,
    removeFeed,
    hasFeed,
  };

  return <FeedContext.Provider value={ctxValue}>{children}</FeedContext.Provider>;
}
