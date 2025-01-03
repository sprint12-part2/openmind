import { Link, useMatch, useParams } from "react-router-dom";
import { useFeed } from "@context/FeedContext";
import styles from "./AnswerButton.module.css";

export function AnswerButton() {
  const { id } = useParams();
  const subjectId = Number(id);
  const { hasFeed } = useFeed();
  const isOwner = hasFeed(subjectId);
  const isQuestionPage = useMatch("/post/:id"); // 분기 처리

  if (!isOwner || !isQuestionPage) return null;

  return (
    <div className={styles.controls}>
      <Link to={`/post/${subjectId}/answer`} className={styles.button}>
        답변하러가기
      </Link>
    </div>
  );
}
