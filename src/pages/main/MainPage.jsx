import Lottie from "react-lottie";
import LogoLottie from "@assets/img/common/logo.json";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles.container}>
      MainPage : 기연님 작업페이지
      <div>
        <Lottie options={{ loop: true, autoplay: true, animationData: LogoLottie }} />
      </div>
    </div>
  );
}
