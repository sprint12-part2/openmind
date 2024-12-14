// import Lottie from "react-lottie";git fetch origin
// import LogoLottie from "@assets/img/common/logo.json";
import styles from "./MainPage.module.css";
import MainLogo from "./components/MainLogo";
import { LinkButton } from "@components/Button";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.link}>
          <Link to="/list">
            <LinkButton color="primary">질문하러 가기</LinkButton>
          </Link>
        </div>
      </div>
      <MainLogo />
      {/* <div>
        <Lottie options={{ loop: true, autoplay: true, animationData: LogoLottie }} />
      </div>  */}
    </div>
  );
}
