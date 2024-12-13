import defaultAvatar from "@assets/img/common/avatar.svg";
import styles from "./Avatar.module.css";

/**
 *
 * 프로필 사진 컴포넌트, 오류발생시 기본 프로필 이미지로 대체합니다.
 *
 * @param {object} props
 * @param {string} props.src - 프로필 사진 url
 * @param {string} props.alt - 프로필 사진 대체텍스트 (방제목 대체가능)
 * @param {number} props.size - 프로필 사진 컴포넌트 크기 설정 (단위업이 넣어주세요. px단위로)
 *
 * @returns {JSX.Element} 프로필 사진을 포함한 figure 요소
 *
 * @example
 * // 100x100 크기의 프로필 사진 컴포넌트 (고정 사이즈)
 * <Avatar src="사진주소" alt="텍스트" size={100} />
 *
 * // 부모 컨테이너 너비에 꽉차는 사진 컴포넌트 (반응형에는 이렇게 이용)
 * <div style={{width: '100px'}}>
 *  <Avatar src="사진주소" alt="텍스트" />
 * </div>
 */

export function Avatar({ src, alt = "", size }) {
  const coverStyle = {
    width: size ? `${size / 10}rem` : "100%",
  };

  function handleError(e) {
    e.target.src = defaultAvatar;
  }

  const imgSrc = src || defaultAvatar;

  return (
    <figure className={styles.cover} style={coverStyle}>
      <img className={styles.img} src={imgSrc} alt={alt} onError={handleError} />
    </figure>
  );
}
