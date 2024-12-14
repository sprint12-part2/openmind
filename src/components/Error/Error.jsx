import { Link } from "react-router-dom";
import defaultImg from "@assets/img/common/avatar.svg";
import styles from "./Error.module.css";

export function Error({ title, message }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <figure className={styles.icon}>
          <img src={defaultImg} alt="error" />
        </figure>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.message}>{message}</div>
        <div className={styles.action}>
          <Link to="/" replace className={styles.button}>
            처음으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
