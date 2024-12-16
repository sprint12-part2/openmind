import { Reaction } from "@components/Reaction";
import styles from "./Reactions.module.css";

export function Reactions({ questionId, like, dislike, onLike }) {
  return (
    <footer className={styles.footer}>
      <Reaction type="like" count={like} onClick={() => onLike({ questionId, type: "like" })} />
      <Reaction
        type="dislike"
        count={dislike}
        onClick={() => onLike({ questionId, type: "dislike" })}
      />
    </footer>
  );
}
