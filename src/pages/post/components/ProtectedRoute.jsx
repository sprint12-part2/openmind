import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFeed } from "@context/FeedContext";
import { Notify } from "@components/Toast";
import { MESSAGES } from "@constants/messages";

export default function ProtectedRoute({ children }) {
  const { id } = useParams();
  const { hasFeed } = useFeed();

  const subjectId = Number(id);
  const hasAccess = hasFeed(subjectId);

  useEffect(() => {
    if (!hasAccess) {
      Notify({ type: "error", message: MESSAGES.PERMISSION });
    }
  }, [hasAccess]);

  if (!hasAccess) {
    return <Navigate to="/list" replace />;
  }

  return children;
}
