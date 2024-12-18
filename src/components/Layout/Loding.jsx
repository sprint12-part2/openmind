import { createPortal } from "react-dom";
import styles from "./Loading.module.css";

export function Loading() {
  return createPortal(
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>,
    document.querySelector("#root"),
  );
}
