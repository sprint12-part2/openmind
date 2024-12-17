import { FloatingButton } from "@components/ui";
import styles from "./FeedDeleteButton.module.css";

export function FeedDeleteButton({ ...props }) {
  return (
    <div className={styles.controls}>
      <FloatingButton size="sm" className={styles.button} {...props}>
        삭제하기
      </FloatingButton>
    </div>
  );
}
