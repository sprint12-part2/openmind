import Lottie from "react-lottie";
import LogoLottie from "@assets/img/common/logo.json";
import styles from "./MainPage.module.css";
import MainLogo from "./components/MainLogo";
import MainPageInputForm from "./components/MainPageInputForm";
import { LinkButton } from "@components/Button/index.js";
import { Icon } from "@components/Icon/index.js";
import { useNavigate } from "react-router-dom";
import { MyFeeds } from "@components/MyFeeds/MyFeeds";
import { useRef } from "react";
import { MyFeedsButton } from "@components/MyFeeds";

export default function MainPage() {
  const navigate = useNavigate();
  const myFeedsModalRef = useRef(null);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.link}>
          <LinkButton responsive={true} onClick={() => navigate(`/list`)}>
            질문하러 가기 <Icon name="arrowRight" size={18}></Icon>
          </LinkButton>
        </div>
      </div>
      <MainLogo />
      <section className={styles.section}>
        <MainPageInputForm />
        <MyFeedsButton onClick={() => myFeedsModalRef.current?.open()} />
        <MyFeeds ref={myFeedsModalRef} />
      </section>
      <div className={styles.lottie}>
        <Lottie
          options={{ loop: true, autoplay: true, animationData: LogoLottie }}
          isClickToPauseDisabled={true}
        />
      </div>
    </div>
  );
}
