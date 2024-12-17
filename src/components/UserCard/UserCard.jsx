import { Avatar } from "@components/Avatar/Avatar";
import { Icon } from "@components/Icon/index.js";
import { useState } from "react";
import styles from "./UserCard.module.css";

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
