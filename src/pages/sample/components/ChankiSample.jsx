import { Icon } from "@components/Icon";
import { Reaction } from "@components/Reaction";
import styles from "./ChankiSample.module.css";
import { Avatar } from "@components/Avatar/Avatar";

export default function ChankiSample() {
  return (
    <div>
      <div className={styles.flex}>
        <Avatar
          src="https://fastly.picsum.photos/id/502/200/200.jpg?hmac=c6mcZ5mcmjadIeDKaJClpvPz9R9-X9q6c0Un-n73Kv4"
          name="방 사진"
          size={120}
        />
        <div style={{ width: "80px" }}>
          <Avatar src="error" />
        </div>
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={0} />
        <Reaction type="dislike" count={0} />
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={16} />
        <Reaction type="dislike" count={0} />
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={0} />
        <Reaction type="dislike" count={6} />
      </div>
      <div className={styles.flex}>
        <Reaction type="like" count={0} disabled />
        <Reaction type="dislike" count={6} disabled />
      </div>
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
