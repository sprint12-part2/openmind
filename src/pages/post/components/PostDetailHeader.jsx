import { useLoaderData, Link } from "react-router-dom";
import { Avatar, Icon } from "@components/ui";
import styles from "./PostDetailHeader.module.css";
import logo from "/src/assets/img/common/logo.svg";

export default function PostDetailHeader() {
  //const data = useLoaderData(); // 이렇게 쓰셔도 되고, 분해하셔도 되욤
  const { name, imageSource } = useLoaderData();

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
        <button className={styles.sns__link}>
          <Icon name="link" color="var(--color-white)" size="18" />
        </button>
        <button className={styles.sns__kakao}>
          <Icon name="kakao" color="var(--color-black)" size="18" />
        </button>
        <button className={styles.sns__facebook}>
          <Icon name="facebook" color="var(--color-white)" size="18" />
        </button>
      </div>
    </div>
  );
}
