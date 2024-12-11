import { colorMap } from "./iconColor.jsx";
import { iconData } from "./iconData.jsx";

/**
 *
 * @param {object} props
 * @param {string} props.name - 아이콘 이름
 * @param {number} props.size - 아이콘 크기 (기본값 24)
 * @param {string} props.color - 아이콘 색상 (기본값 #000)
 *
 * @returns {JSX.Element|null} - 아이콘 svg 또는 존재하지 않는 아이콘일 경우 null
 *
 * @example
 * //아이콘 크기 변경
 * <Icon name="arrowUp" size={32} />
 *
 * @example
 * //아이콘 색상 변경
 * <Icon name="arrowUp" color="#fco" />
 * <Icon name="arrowUp" color="primary" />
 */

export function Icon({ name, size = 24, color = "#000", ...props }) {
  const icon = iconData[name];
  if (!icon) {
    console.warn(`${name}은 없는 아이콘입니다.`);
    return null;
  }

  const targetColor = colorMap[color] || color;

  return (
    <svg
      width={size}
      height={size}
      fill={targetColor}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {icon}
    </svg>
  );
}
