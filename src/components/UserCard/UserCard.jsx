import { Avatar } from "@components/Avatar/Avatar";
import { Icon } from "@components/Icon/index.js";
import styles from "./UserCard.module.css";

export function UserCard({
  name = "undefined",
  imageSource = "undefined",
  questionCount = "undefined",
}) {
  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-user-content"]}>
        <div className={styles["card-user-avatar"]}>
          <Avatar src={imageSource} alt={name + "님의 프로필 이미지"} />
        </div>
        <div className={styles["user-name"]}>{name}</div>
      </div>
      <div className={styles["card-question-content"]}>
        <div className={styles["question-label"]}>
          <Icon name="message" color="gray-400" className={styles["question-icon"]} />
          <p>받은 질문</p>
        </div>
        <p className={styles["question-count"]}>{questionCount}개</p>
      </div>
    </div>
  );
}
