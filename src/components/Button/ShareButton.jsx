import { Icon } from "@components/Icon";
import clsx from "clsx";
import styles from "./ShareButton.module.css";
/**
 * ShareButton 컴포넌트: 공유하기 기능에 사용되는 원형 버튼 컴포넌트
 * - 배경 색상, 아이콘 색상 및 크기 등의 옵션으로 다양한 스타일의 공유 버튼을 렌더링
 */
export function ShareButton({
  onClick,
  children,
  className,
  icon = "",
  color = "",
  type = "button",
  disabled = false,
  iconColor = "#ffffff",
  ...props
}) {
  // 버튼의 배경 색상을 color prop으로 동적으로 설정
  const buttonStyle = {
    backgroundColor: color,
  };

  return (
    <button
      className={clsx(
        styles.button,
        disabled && styles.disabled, // disabled일 때 추가되는 스타일
        className, // 외부에서 추가되는 클래스 이름
      )}
      style={buttonStyle} // 동적으로 설정된 배경색 적용
      type={type} // 버튼 타입 (button, submit)
      onClick={onClick} // 클릭 이벤트 핸들러
      disabled={disabled} // disabled 상태
      {...props} // 추가적인 props 추가
    >
      {icon && <Icon name={icon} color={iconColor} size={18} />}{" "}
      {/* 버튼에 사용될 아이콘 컴포넌트 */}
      {children} {/* 버튼의 텍스트 요소 */}
    </button>
  );
}
