import styles from "./InputTextarea.module.css";
import clsx from "clsx";

/**
 * `InputTextarea` 컴포넌트는 여러 줄의 텍스트 입력을 받을 수 있는 텍스트 영역을 제공합니다.
 *
 * @param {object} props - 컴포넌트에 전달되는 속성.
 * @param {string} props.value - 텍스트 영역의 현재 값.
 * @param {function} props.onChange - 텍스트 값이 변경될 때 호출되는 이벤트 핸들러.
 * @param {string} [props.placeholder="이름을 입력하세요"] - 텍스트 영역에 표시되는 기본 안내 텍스트.
 * @param {number} [props.rows=6] - 텍스트 영역의 초기 표시 줄 수 (기본값: 6).
 * @param {number} [props.maxLength=500] - 텍스트 영역에서 입력 가능한 최대 글자 수 (기본값: 500).
 * @param {string} [props.className] - 추가적인 사용자 정의 CSS 클래스.
 * @param {...object} props - 그 외 추가적으로 전달받는 모든 속성.
 *
 * @returns {JSX.Element} 텍스트 영역 JSX 요소를 반환합니다.
 *
 * @example
 * <InputTextarea
 *   value={content}
 *   onChange={(e) => setContent(e.target.value)}
 *   placeholder="내용을 입력하세요"
 *   rows={10}
 *   maxLength={1000}
 * />
 *
 * @author 남기연 <getam101@naver.com>
 */

export function InputTextarea({
  value,
  onChange,
  placeholder = "이름을 입력하세요",
  rows = 6, // 텍스트 줄 수
  maxLength = 500, // 최대 글자 수 입니다.
  className,
  ...props
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className={clsx(styles.textarea, className)}
      {...props}
    />
  );
}
