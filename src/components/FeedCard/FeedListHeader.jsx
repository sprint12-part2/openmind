import { Icon } from "@components/ui";
import styles from "./FeedListHeader.module.css";

export function FeedListHeader({ count }) {
  return (
    <header className={styles.header}>
      <Icon name="message" />
      {count > 0 ? `${count}개의 질문이 있습니다.` : "아직 질문이 없습니다"}
    </header>
  );
}
