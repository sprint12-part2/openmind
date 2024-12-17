import Lottie from "react-lottie";
import LogoLottie from "@assets/img/common/logo.json";
import styles from "./MainPage.module.css";
import MainLogo from "./components/MainLogo";
import MainPageInputForm from "./components/MainPageInputForm";
import { LinkButton } from "@components/Button/index.js";
import { Icon } from "@components/Icon/index.js";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.link}>
          <LinkButton onClick={() => navigate(`/list`)}>
            질문하러 가기 <Icon name="arrowRight" size={18}></Icon>
          </LinkButton>
        </div>
      </div>
      <MainLogo />
      <section className={styles.section}>
        <MainPageInputForm />
      </section>
      <div className={styles.lottie}>
        <Lottie options={{ loop: true, autoplay: true, animationData: LogoLottie }} />
      </div>
    </div>
  );
}
