import { createSubject, deleteSubject } from "@service/Subject";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const FeedContext = createContext();

export const useFeed = () => useContext(FeedContext);

export default function FeedContextProvider({ children }) {
  const [visited, setVisited] = useState(() => {
    const saved = localStorage.getItem("visited");
    return saved ? JSON.parse(saved) : [];
  });
  const [feeds, setFeeds] = useState(() => {
    const saved = localStorage.getItem("feeds");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("feeds", JSON.stringify(feeds));
  }, [feeds]);

  useEffect(() => {
    localStorage.setItem("visited", JSON.stringify(visited));
  }, [visited]);

  const createFeed = useCallback(async (name) => {
    setIsLoading(true);

    const response = await createSubject({ name });
    setFeeds((prev) => [response, ...prev]);
    setIsLoading(false);
    return response;
  }, []);

  const removeFeed = useCallback(async (feedId) => {
    setIsLoading(true);

    await deleteSubject(Number(feedId));
    setFeeds((prev) => prev.filter((feed) => feed.id !== feedId));
    setIsLoading(false);
  }, []);

  const hasFeed = useCallback(
    (feedId) => {
      return feeds.find((feed) => feed.id === Number(feedId));
    },
    [feeds],
  );

  const saveVisited = useCallback(
    (feedData) => {
      if (visited.find((feed) => feed.id === feedData.id)) return;

      setVisited((prev) => {
        const filterd = prev.filter((item) => item.id !== feedData.id);
        return [feedData, ...filterd].slice(0, 4);
      });
    },
    [feeds],
  );

  const clearVisited = useCallback(() => {
    setVisited([]);
  }, []);

  const ctxValue = {
    isLoading,
    feeds,
    createFeed,
    removeFeed,
    hasFeed,
    visited,
    saveVisited,
    clearVisited,
  };

  return <FeedContext.Provider value={ctxValue}>{children}</FeedContext.Provider>;
}
