import styles from "./GyeonSample.module.css";
import { InputField } from "@components/Input/InputField";
import { InputTextarea } from "@components/Input/InputTextarea";
import { UserCard } from "@components/UserCard/UserCard";

export default function GyeonSample() {
  return (
    <div className={styles.container}>
      <InputField />
      <InputTextarea />
      <div className={styles["section-container"]}>
        <section className={styles.section}>
          <UserCard name={"남기연"} imageSource={undefined} questionCount={"10"} />
          <UserCard name={"남기연"} imageSource={undefined} questionCount={"10"} />
          <UserCard name={"남기연"} imageSource={undefined} questionCount={"10"} />
          <UserCard name={"남기연"} imageSource={undefined} questionCount={"10"} />
        </section>
      </div>
    </div>
  );
}
