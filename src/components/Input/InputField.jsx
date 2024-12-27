import styles from "./InputField.module.css";
import { Icon } from "@components/Icon";

/**
 * `InputField` 컴포넌트는 사용자 입력을 받을 수 있는 기본적인 입력 필드를 제공합니다.
 *
 * @param {object} props - 컴포넌트에 전달되는 속성.
 * @param {string} props.value - 입력 필드의 현재 값.
 * @param {function} props.onChange - 입력 값이 변경될 때 호출되는 이벤트 핸들러.
 * @param {string} [props.type="text"] - 입력 필드의 타입 (기본값: "text").
 * @param {string} [props.placeholder="이름을 입력하세요"] - 입력 필드에 표시되는 기본 안내 텍스트.
 * @param {string} [props.className] - 추가적인 사용자 정의 CSS 클래스.
 * @param {...object} props - 그 외 추가적으로 전달받는 모든 속성.
 *
 * @returns {JSX.Element} 입력 필드 JSX 요소를 반환합니다.
 *
 * @author 남기연 <getam101@naver.com>
 */

export function InputField({ icon, type = "text", placeholder = "이름을 입력하세요", ...props }) {
  return (
    <div className={styles.container}>
      {icon && <Icon name={icon} />}
      <input className={styles.input} type={type} placeholder={placeholder} {...props} />
    </div>
  );
}
