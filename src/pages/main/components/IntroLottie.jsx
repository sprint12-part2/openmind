import Lottie from "react-lottie";
import LogoLottie from "@assets/img/common/logo.json";
import styles from "./IntroLottie.module.css";

function IntroLottie() {
  return (
    <div className={styles.lottie}>
      <Lottie
        options={{ loop: true, autoplay: true, animationData: LogoLottie }}
        isClickToPauseDisabled={true}
      />
    </div>
  );
}

export default IntroLottie;
