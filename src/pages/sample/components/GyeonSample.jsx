import styles from "./GyeonSample.module.css";
import { InputField, InputTextarea } from "@components/Input/index.js";
import { UserCard } from "@components/UserCard/index.js";

export default function GyeonSample() {
  return (
    <div className={styles.container}>
      <InputField />
      <InputTextarea />
      <div className={styles["section-container"]}>
        <section className={styles.section}>
          <UserCard
            name={"남기연"}
            imageSource={
              "https://fastly.picsum.photos/id/502/200/200.jpg?hmac=c6mcZ5mcmjadIeDKaJClpvPz9R9-X9q6c0Un-n73Kv4"
            }
            questionCount={"10"}
          />
          <UserCard name={"남기연"} imageSource={undefined} questionCount={"10"} />
          <UserCard name={"남기연"} imageSource={undefined} questionCount={"10"} />
          <UserCard name={"남기연"} imageSource={undefined} questionCount={"10"} />
        </section>
      </div>
    </div>
  );
}
