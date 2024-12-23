import { Link, useNavigate } from "react-router-dom";
import { LinkButton } from "@components/Button";
import { Icon } from "@components/Icon";
import styles from "./PostListHeader.module.css";
import logo from "/src/assets/img/common/logo.svg";
import { MyFeeds } from "@components/MyFeeds/MyFeeds";
import { useRef } from "react";
import { useFeed } from "@context/FeedContext";
/**
 * PostListHeader 컴포넌트: 피드 목록 페이지 상단에 위치하는 헤더 컴포넌트
 * - 오픈마인드 로고, 답변하러 가기 버튼, 피드 목록 모달 포함
 * 사용자가 "답변하러 가기" 버튼을 클릭하면, 피드 목록을 확인할 수 있음.
 * 사용자가 만든 피드가 없을 경우 홈 화면으로 이동
 */
export default function PostListHeader() {
  const myFeedsModalRef = useRef(null);
  const { feeds } = useFeed();
  const navigate = useNavigate();
  //"답변하러 가기" 버튼 클릭 시 실행되는 함수
  function handleClick() {
    if (feeds.length) {
      myFeedsModalRef.current?.open();
    } else {
      navigate("/");
    }
  }

  return (
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
  );
}
