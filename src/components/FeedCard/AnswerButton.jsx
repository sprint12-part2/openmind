import { useFeed } from "@context/FeedContext";
import { Link, useMatch, useParams } from "react-router-dom";
import styles from "./AnswerButton.module.css";

export function AnswerButton() {
  const { id } = useParams();
  const { hasFeed } = useFeed();
  const isOwner = hasFeed(id);
  const isQuestionPage = useMatch("/post/:id");

  if (!isOwner || !isQuestionPage) return null;

  return (
    <div className={styles.controls}>
      <Link to={`/post/${id}/answer`} className={styles.button}>
        답변하러가기
      </Link>
    </div>
  );
}
