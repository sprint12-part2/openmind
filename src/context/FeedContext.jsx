import { createSubject, deleteSubject } from "@service/Subject";
import { createContext, useContext, useEffect, useState } from "react";

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

  async function createFeed(name) {
    setIsLoading(true);

    const response = await createSubject({ name });
    setFeeds((prev) => [response, ...prev]);
    setIsLoading(false);
    return response;
  }

  async function removeFeed(feedId) {
    setIsLoading(true);

    await deleteSubject(feedId);
    setFeeds((prev) => prev.filter((feed) => feed.id !== feedId));
    setIsLoading(false);
  }

  function hasFeed(feedId) {
    return feeds.find((feed) => feed.id === feedId);
  }

  const ctxValue = { isLoading, feeds, createFeed, removeFeed, hasFeed };

  return <FeedContext.Provider value={ctxValue}>{children}</FeedContext.Provider>;
}
