// import Lottie from "react-lottie";
// import LogoLottie from "@assets/img/common/logo.json";
import styles from "./MainPage.module.css";
import MainLogo from "./components/MainLogo";

export default function MainPage() {
  return (
    <div className={styles.container}>
      <MainLogo />
      {/* <div>
        <Lottie options={{ loop: true, autoplay: true, animationData: LogoLottie }} />
      </div> */}
    </div>
  );
}
