import { Avatar } from "@components/Avatar/Avatar";
import { Icon } from "@components/Icon/index.js";
import styles from "./UserCard.module.css";

/**
 * `UserCard` 컴포넌트는 유저의 정보를 카드 형태로 표시합니다.
 *
 * @param {object} props - 컴포넌트에 전달되는 속성.
 * @param {string} [props.name="undefined"] - 유저의 이름.
 * @param {string} [props.imageSource="undefined"] - 유저의 프로필 이미지 URL.
 * @param {string|number} [props.questionCount="undefined"] - 유저가 받은 질문의 개수.
 *
 * @returns {JSX.Element} 유저 정보를 카드 형식으로 렌더링하는 JSX 요소를 반환합니다.
 *
 * @example
 * <UserCard
 *   name="홍길동"
 *   imageSource="https://example.com/profile.jpg"
 *   questionCount={5}
 * />
 *
 * @author 남기연 <getam101@naver.com>
 */

export function UserCard({
  name = "undefined",
  imageSource = "undefined",
  questionCount = "undefined",
}) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <Avatar src={imageSource} alt={name + "님의 프로필 이미지"} />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.meta}>
        <div className={styles.label}>
          <Icon name="message" color="gray-400" className={styles["question-icon"]} />
          <p>받은 질문</p>
        </div>
        <p className={styles.count}>{questionCount}개</p>
      </div>
    </div>
  );
}
