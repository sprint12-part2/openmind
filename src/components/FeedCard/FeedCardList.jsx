import emptyIcon from "@assets/img/common/icon_empty.svg";
import styles from "./FeedCardList.module.css";

export function FeedCardList({ data, children }) {
  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <img src={emptyIcon} alt="아직 질문이 없습니다." />
      </div>
    );
  }
  return (
    <ul className={styles.list}>
      {data.map((question) => (
        <li key={question.id}>{children(question)}</li>
      ))}
    </ul>
  );
}
