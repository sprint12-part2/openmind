import styles from "./PostListHeader.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LinkButton } from "@components/Button";
import { Icon } from "@components/Icon";
import logo from "/src/assets/img/common/logo.svg";
import { MyFeeds } from "@components/MyFeeds/MyFeeds";
import { useRef } from "react";
import { useFeed } from "@context/FeedContext";

export default function PostListHeader() {
  const myFeedsModalRef = useRef(null);
  const { feeds } = useFeed();
  const navigate = useNavigate();

  function handleClick() {
    if (feeds.length) {
      myFeedsModalRef.current?.open();
    } else {
      navigate("/");
    }
  }

  return (
    <div className={styles.header__container}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img src={logo} alt="오픈마인드 로고" />
          </Link>
        </div>
        <LinkButton onClick={handleClick} responsive={true}>
          답변하러 가기
          <Icon name="arrowRight" size={18}></Icon>
        </LinkButton>
        <MyFeeds ref={myFeedsModalRef} />
      </div>
      {/* <h1 className={styles.title}>누구에게 질문할까요?</h1> */}
    </div>
  );
}
