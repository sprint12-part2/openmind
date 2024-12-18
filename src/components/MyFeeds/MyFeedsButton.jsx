import styles from "./MyFeedsButton.module.css";

export function MyFeedsButton({ ...props }) {
  return (
    <div className={styles.controls}>
      <button type="button" className={styles.more} {...props}>
        이미 생성한 피드가 있나요?
      </button>
    </div>
  );
}
