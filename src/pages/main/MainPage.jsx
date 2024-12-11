import Lottie from "react-lottie";
import LogoLottie from "@assets/img/common/logo.json";

export default function MainPage() {
  return (
    <div>
      MainPage : Openmind
      <div>
        <Lottie options={{ loop: true, autoplay: true, animationData: LogoLottie }} />
      </div>
    </div>
  );
}
