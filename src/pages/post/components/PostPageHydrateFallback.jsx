import defaultImg from "@assets/img/common/avatar.svg";
import styles from "./PostPageHydrateFallback.module.css";

export default function HydrateFallback() {
  return (
    <div className={styles.container}>
      <figure className={styles.icon}>
        <img src={defaultImg} alt="openmind" />
      </figure>
      <div className={styles.message}>피드 정보를 불러오는 중입니다</div>
    </div>
  );
}
