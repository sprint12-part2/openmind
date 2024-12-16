import { Notify } from "@components/Toast";
import { useFeed } from "@context/FeedContext";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { id } = useParams();
  const { hasFeed } = useFeed();
  const hasAccess = hasFeed(id);
  useEffect(() => {
    // useeffect는 비동기라서
    // Navigate 컴포넌트가 반환되더라도, 스케쥴링되어서 실행되는점을 이용
    if (!hasAccess) {
      Notify({ type: "error", message: "권한이 없습니다." });
    }
  }, [hasAccess]);
  if (!hasAccess) {
    return <Navigate to="/list" replace />;
  }
  return children;
}
