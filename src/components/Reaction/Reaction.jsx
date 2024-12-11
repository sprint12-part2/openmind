import clsx from "clsx";
import { Icon } from "@components/Icon";
import styles from "./Reaction.module.css";

/**
 * Reaction 버튼 컴포넌트
 * 
 * 좋아요와 싫어요 버튼을 생성합니다. 
 * 카운트 값에 따라 버튼과 아이콘의 색상이 변합니다.
 * 
 * 좋아요 (like) : 카운트가 1 이상이면 파란색
 * 싫어요 (dislike):  카운트가 1 이상이면 검은색
 * 비활성화된 경우 색상은 회색
 * 
 * @param {object} props
 * @param {string} props.type - 버튼 유형 ("like" | "dislike")
 * @param {number} props.count - 카운트 숫자
 * @param {boolean} props.disabled - 버튼 비활성화 여부
 *
 * @returns {JSX.Element} - 좋아요 또는 싫어요 버튼 컴포넌트
 *

 * @example
 * //기본 사용법
 * <Reaction type="like" count={16} />
 *
 * //onClick 핸들러 추가 가능
 * //(기본적인 button의 props는 다 받을수 있어요)
 * <Reaction type="dislike" count={16} onClick={() => console.log('싫어요 클릭')} />
 *
 * //버튼 비활성
 * <Reaction type="dislike" count={0} disabled />
 */

export function Reaction({ type = "like", count = 0, disabled, ...props }) {
  const isActive = count > 0;
  const buttonCss = clsx(
    styles.button,
    type === "like" ? styles.like : styles.dislike,
    isActive && styles.active,
    disabled && styles.disabled,
  );
  const iconName = type === "like" ? "thumbsUp" : "thumbsDown";
  const text = type === "like" ? "좋아요" : "싫어요";

  let iconColor = "gray-400";
  if (isActive && !disabled) {
    iconColor = type === "like" ? "blue" : "black";
  }

  return (
    <button type="button" className={buttonCss} disabled={disabled} {...props}>
      <Icon size={16} color={iconColor} name={iconName} className={styles.icon} />
      <div className={styles.label}>
        <span className={styles.title}>{text}</span>
        {count ? <span className={styles.count}>{count}</span> : ""}
      </div>
    </button>
  );
}
