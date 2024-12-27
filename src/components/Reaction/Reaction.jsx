import clsx from "clsx";
import { Icon } from "@components/Icon";
import styles from "./Reaction.module.css";

/**
 * Reaction 버튼 컴포넌트
 *
 * @param {object} props
 * @param {number} [props.count=0] - 카운트 숫자 (기본값:0)
 * @param {string} [props.icon] - 아이콘 이름
 * @param {string} props.text - 버튼 텍스트
 * @param {boolean} [props.active] - 버튼 active 여부
 * @param {string} [props.activeColor] - 버튼 active 색상
 * @param {boolean} [props.disabled] - 버튼 비활성화 여부
 * @param {React.ButtonHTMLAttributes} [props] - 추가적으로 전달되는 버튼 props
 *
 * @returns {JSX.Element} - 좋아요 또는 싫어요 버튼 컴포넌트
 */

export function Reaction({
  count = 0,
  icon,
  text,
  active = false,
  activeColor = "var(--color-blue)",
  disabled,
  ...props
}) {
  const buttonCss = clsx(styles.button, disabled && styles.disabled);

  return (
    <button
      type="button"
      className={buttonCss}
      disabled={disabled}
      style={active ? { color: activeColor } : undefined}
      {...props}
    >
      {icon && <Icon size={16} name={icon} className={styles.icon} />}
      <div className={styles.label}>
        <span className={styles.title}>{text}</span>
        {count ? <span className={styles.count}>{count}</span> : ""}
      </div>
    </button>
  );
}
