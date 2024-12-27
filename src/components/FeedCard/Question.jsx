import { Badge } from "@components/ui";
import { fromNow } from "@util/format";
import styles from "./Question.module.css";

export function Question({ status, createdAt, content, children }) {
  return (
    <>
      <header className={styles.header}>
        <Badge status={status ? "completed" : "incomplete"} />
        {children}
      </header>
      <div className={styles.question}>
        <div className={styles.meta}>질문 · {fromNow(createdAt, new Date())}</div>
        <h3 className={styles.title}>{content}</h3>
      </div>
    </>
  );
}
