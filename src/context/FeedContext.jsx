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

    try {
      const response = await createSubject({ name });
      setFeeds((prev) => [response, ...prev]);
      return response;
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFeed(feedId) {
    setIsLoading(true);

    try {
      await deleteSubject(feedId);
      setFeeds((prev) => prev.filter((feed) => feed.id !== feedId));
    } finally {
      setIsLoading(false);
    }
  }

  function hasFeed(feedId) {
    return feeds.find((feed) => feed.id === feedId);
  }

  const ctxValue = { isLoading, feeds, createFeed, removeFeed, hasFeed };

  return <FeedContext.Provider value={ctxValue}>{children}</FeedContext.Provider>;
}
