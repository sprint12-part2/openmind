import MainLogoImg from "/src/assets/img/common/logo.svg";
import styles from "./MainLogo.module.css";

export default function MainLogo() {
  return (
    <div className={styles.logo}>
      <img src={MainLogoImg} alt="오픈마인드 로고이미지" />
    </div>
  );
}
