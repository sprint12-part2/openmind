import { Reaction } from "@components/Reaction";
import styles from "./Reactions.module.css";

export function Reactions({ like, dislike, onReaction }) {
  return (
    <footer className={styles.footer}>
      <Reaction
        text="좋아요"
        icon="thumbsUp"
        count={like}
        active={like > 0}
        activeColor="var(--color-blue)"
        onClick={() => onReaction("like")}
      />
      <Reaction
        text="싫어요"
        icon="thumbsDown"
        count={dislike}
        active={dislike > 0}
        activeColor="var(--color-black)"
        onClick={() => onReaction("dislike")}
      />
    </footer>
  );
}
