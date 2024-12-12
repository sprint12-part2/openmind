import styles from "./GyeonSample.module.css";
import { InputField, InputTextarea } from "@components/Input/index.js";

export default function GyeonSample() {
  return (
    <div className={styles.container}>
      <InputField />
      <InputTextarea />
    </div>
  );
}
