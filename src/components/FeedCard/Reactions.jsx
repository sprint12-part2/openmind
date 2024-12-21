import { Reaction } from "@components/Reaction";
import styles from "./Reactions.module.css";

export function Reactions({ like, dislike, onReaction }) {
  return (
    <footer className={styles.footer}>
      <Reaction type="like" count={like} onClick={() => onReaction("like")} />
      <Reaction type="dislike" count={dislike} onClick={() => onReaction("dislike")} />
    </footer>
  );
}
