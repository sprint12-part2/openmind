import clsx from "clsx";
import styles from "./Badge.module.css";

export function Badge({ status = "incomplete" }) {
  const css = clsx(styles.badge, styles[status]);
  return (
    <div>
      <span className={css}>{status === "completed" ? "답변 완료" : "미답변"}</span>
    </div>
  );
}
