import { Reaction } from "@components/Reaction";
import styles from "./Reactions.module.css";

export function Reactions({ like, dislike, onReaction }) {
  return (
    <footer className={styles.footer}>
      <Reaction
        icon="thumbsUp"
        active={like > 0}
        activeColor="var(--color-blue)"
        onClick={() => onReaction("like")}
      >
        좋아요 {like > 0 && like}
      </Reaction>
      <Reaction
        icon="thumbsDown"
        active={dislike > 0}
        activeColor="var(--color-black)"
        onClick={() => onReaction("dislike")}
      >
        싫어요 {dislike > 0 && dislike}
      </Reaction>
    </footer>
  );
}
