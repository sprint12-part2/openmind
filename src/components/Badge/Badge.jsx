import styles from "./Badge.module.css";

export function Badge({ status }) {
  const badgeData = {
    completed: {
      label: "답변 완료",
      color: "var(--color-primary-400)",
      borderColor: "var(--color-primary-400)",
    },
    incomplete: {
      label: "미답변",
      color: "var(--color-gray-400)",
      borderColor: "var(--color-gray-400)",
    },
  };

  const badge = badgeData[status];
  if (!badge) {
    return null;
  }

  return (
    <div>
      <span
        className={styles.badge}
        style={{
          color: badge.color,
          borderColor: badge.borderColor,
        }}
      >
        {badge.label}
      </span>
    </div>
  );
}
