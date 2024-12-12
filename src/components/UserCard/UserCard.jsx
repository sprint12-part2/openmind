import { Avatar } from "@components/Avatar/Avatar";
import { Icon } from "@components/Icon/index.js";
import { useState, useEffect } from "react";
import styles from "./UserCard.module.css";

// 현재 페이지 사이즈가 767px 보다 작으면 Avatar컴포넌트 size에 48삽입
//  현재 페이지 사이즈가 767px 보다 작으면 Icon컴포넌트 size에 16삽입
const getPageSize = () => {
  const width = window.innerWidth;
  return {
    avatarSize: width < 768 ? 48 : 60,
    iconSize: width < 768 ? 16 : 18,
  };
};

export function UserCard({
  name = "undefined",
  imageSource = "undefined",
  questionCount = "undefined",
}) {
  const [sizes, setSizes] = useState(getPageSize());

  // 화면 크기 변화 감지 및 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setSizes(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles["card-container"]}>
      <div className={styles["card-user-content"]}>
        <Avatar src={imageSource} alt={name + "님의 프로필 이미지"} size={sizes.avatarSize} />
        <div className={styles["user-name"]}>{name}</div>
      </div>
      <div className={styles["card-question-content"]}>
        <div className={styles["question-label"]}>
          <Icon name="message" size={sizes.iconSize} color="gray-400" />
          <p>받은 질문</p>
        </div>
        <p className={styles["question-count"]}>{questionCount}개</p>
      </div>
    </div>
  );
}
