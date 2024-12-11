import { Icon } from "@components/Icon";
import styles from "./ChankiSample.module.css";

export default function ChankiSample() {
  return (
    <div>
      <div className={styles.flex}>
        <Icon />
        <Icon name="arrowDown" />
        <Icon name="arrowDown" color="#fc0" />
        <Icon name="arrowDown" color="red" />
        <Icon name="arrowDown" size={40} color="var(--color-primary-300)" />
        <Icon name="arrowDown" color="primary" />
      </div>
      <div className={styles.flex}>
        <Icon name="arrowDown" />
        <Icon name="arrowUp" />
        <Icon name="arrowLeft" />
        <Icon name="arrowRight" />
        <Icon name="close" />
        <Icon name="edit" />
        <Icon name="facebook" />
        <Icon name="kakao" />
        <Icon name="link" />
        <Icon name="message" />
        <Icon name="more" />
        <Icon name="person" />
        <Icon name="reject" />
        <Icon name="thumbsUp" />
        <Icon name="thumbsDown" />
      </div>
    </div>
  );
}
