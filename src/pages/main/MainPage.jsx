// import Lottie from "react-lottie";
// import LogoLottie from "@assets/img/common/logo.json";
import styles from "./MainPage.module.css";
import MainLogo from "./components/MainLogo";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* 버튼 컴포넌트 완성되기전까지 임시 */}
        <div className={styles.link}>
          <Link to="/list">
            <div className={styles.btn}>답변하러 가기</div>
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
