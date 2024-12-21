import { useNavigate } from "react-router-dom";
import { LinkButton, Icon } from "@components/ui";
import MainLogoImg from "/src/assets/img/common/logo.svg";
import styles from "./IntroHeader.module.css";

function IntroHeader() {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.controls}>
        <LinkButton responsive={true} className={styles.link} onClick={() => navigate(`/list`)}>
          질문하러 가기 <Icon name="arrowRight" size={18}></Icon>
        </LinkButton>
      </div>
      <div className={styles.logo}>
        <img src={MainLogoImg} alt="오픈마인드 로고이미지" />
      </div>
    </div>
  );
}

export default IntroHeader;
