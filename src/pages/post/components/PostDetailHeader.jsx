import { useLoaderData, Link } from "react-router-dom";
import { useEffect } from "react";
import { Avatar, ShareButton } from "@components/ui";
import { copyUrl, shareKakao, shareFacebook } from "@util/shareUtils";
import { fromNow } from "@util/format";
import { AnswerButton } from "@components/FeedCard";
import styles from "./PostDetailHeader.module.css";
import logo from "/src/assets/img/common/logo.svg";

export default function PostDetailHeader() {
  const { name, imageSource, createdAt } = useLoaderData();

  // 카카오톡 공유하기
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
      console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
    }
    shareKakao(name);
  }, [name]);

  return (
    <div className={styles.header__wrapper}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="로고 이미지" />
        </Link>
      </div>
      <div className={styles.avatar}>
        <Avatar src={imageSource} alt={name + "님의 프로필 이미지"} />
      </div>
      <div className={styles.title}>
        <h1>{name}</h1>
      </div>
      <div className={styles.meta}>생성일 {fromNow(createdAt)}</div>
      <AnswerButton />
      <div className={styles.sns}>
        <ShareButton
          color="var(--color-primary-400)"
          icon="link"
          iconColor="var(--color-white)"
          onClick={copyUrl}
        ></ShareButton>
        <ShareButton
          color="var(--color-yellow)"
          icon="kakao"
          iconColor="var(--color-black)"
          id="kakao-link-btn"
        ></ShareButton>
        <ShareButton
          color="#1877F2"
          icon="facebook"
          iconColor="var(--color-white)"
          onClick={shareFacebook}
        ></ShareButton>
      </div>
    </div>
  );
}
