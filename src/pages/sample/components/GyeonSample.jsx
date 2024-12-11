import styles from "./GyeonSample.module.css";
import { InputField } from "@components/Input/InputField";
import { InputTextarea } from "@components/Input/InputTextarea";

export default function GyeonSample() {
  return (
    <div className={styles.container}>
      <InputField />
      <InputTextarea />
    </div>
  );
}
