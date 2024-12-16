import { useLoaderData, Link } from "react-router-dom";
import { Avatar, Icon } from "@components/ui";
import { copyUrl, shareKakao, shareFacebook } from "@util/shareUtils";
import styles from "./PostDetailHeader.module.css";
import logo from "/src/assets/img/common/logo.svg";
import { useEffect } from "react";

export default function PostDetailHeader() {
  //const data = useLoaderData(); // 이렇게 쓰셔도 되고, 분해하셔도 되욤
  const { name, imageSource } = useLoaderData();

  // 카카오톡 공유하기
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_KEY);
      console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
      shareKakao(name);
    }
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
      <div className={styles.sns}>
        <button className={styles.sns__link} onClick={copyUrl}>
          <Icon name="link" color="var(--color-white)" size="18" />
        </button>
        <button className={styles.sns__kakao} id="kakao-link-btn" onClick={shareKakao}>
          <Icon name="kakao" color="var(--color-black)" size="18" />
        </button>
        <button className={styles.sns__facebook} onClick={shareFacebook}>
          <Icon name="facebook" color="var(--color-white)" size="18" />
        </button>
      </div>
    </div>
  );
}
