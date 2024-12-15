import { useFeed } from "@context/FeedContext";
import { Link, useParams } from "react-router-dom";
import styles from "./AnswerButton.module.css";

export function AnswerButton() {
  const { id } = useParams();
  const { hasFeed } = useFeed();
  const isOwner = hasFeed(id);

  if (!isOwner) return null;

  return (
    <div className={styles.controls}>
      <Link to={`/post/${id}/answer`} className={styles.button}>
        답변하러가기
      </Link>
    </div>
  );
}
