import clsx from "clsx";
import styles from "./LinkButton.module.css";
/**
 * LinkButton 컴포넌트: 페이지 내에서 이동하거나 사용자 동작시에 사용되는 버튼 컴포넌트
 * - 색상, 크기, 반응형 여부 등의 옵션으로 다양한 스타일의 버튼을 렌더링
 */
export function LinkButton({
  onClick,
  children,
  className,
  color = "primary",
  disabled = false,
  type = "button",
  size = "md",
  responsive = false,
  ...props
}) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[color], // 버튼의 색상 (primary, secondary)
        styles[size], // 버튼의 크기 (sm, md 등)
        disabled && styles.disabled, // disabled일 때 추가되는 스타일
        responsive && styles.responsive, // responsive일 때 추가되는 스타일
        className, // 외부에서 추가되는 클래스 이름
      )}
      type={type} // 버튼 타입 (button, submit)
      onClick={onClick} // 클릭 이벤트 핸들러
      disabled={disabled} // disabled 상태
      {...props} // 추가적인 props 추가
    >
      {children} {/* 버튼의 텍스트 요소 */}
    </button>
  );
}
