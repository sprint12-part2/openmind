import ChankiSample from "./components/ChankiSample";
import CharieSample from "./components/CharieSample";
import GyeonSample from "./components/GyeonSample";
import RinaSample from "./components/RinaSample";
import SolSample from "./components/SolSample";
import styles from "./SamplePage.module.css";
import { Button } from "../../components/Button/LinkButton";

export default function SamplePage() {
  return (
    <div className={styles.sample}>
      <h2 className={styles.title}>OPENMIND 공용 컴포넌트 샘플페이지</h2>
      <section className={styles.section}>
        <h3 className={styles["section-title"]}>기연 컴포넌트</h3>
        <GyeonSample />
      </section>
      <section className={styles.section}>
        <h3 className={styles["section-title"]}>리나 컴포넌트</h3>
        <RinaSample />
      </section>
      <section className={styles.section}>
        <h3 className={styles["section-title"]}>찬기 컴포넌트</h3>
        <ChankiSample />
      </section>
      <section className={styles.section}>
        <h3 className={styles["section-title"]}>한솔 컴포넌트</h3>
        <SolSample />
      </section>
      <section className={styles.section}>
        <h3 className={styles["section-title"]}>유섭 컴포넌트</h3>
        <CharieSample />
      </section>
    </div>
  );
}
