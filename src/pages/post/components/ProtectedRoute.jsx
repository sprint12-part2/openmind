import { Notify } from "@components/Toast";
import { MESSAGES } from "@constants/messages";
import { useFeed } from "@context/FeedContext";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { id } = useParams();
  const subjectId = Number(id);
  const { hasFeed } = useFeed();
  const hasAccess = hasFeed(subjectId);
  useEffect(() => {
    // useeffect는 비동기라서
    // Navigate 컴포넌트가 반환되더라도, 스케쥴링되어서 실행되는점을 이용
    if (!hasAccess) {
      Notify({ type: "error", message: MESSAGES.PERMISSION });
    }
  }, [hasAccess]);
  if (!hasAccess) {
    return <Navigate to="/list" replace />;
  }
  return children;
}
