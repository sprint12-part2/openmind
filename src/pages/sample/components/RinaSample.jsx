import { LinkButton, FloatingButton, ShareButton } from "@components/Button";
import styles from "./RinaSample.module.css";
export default function RinaSample() {
  return (
    <div className={styles.rinaPage__container}>
      <div className={styles.rinaPage__content}>
        LinkButton
        <LinkButton color="primary">질문하러 가기</LinkButton>
        <LinkButton color="secondary">질문하러 가기</LinkButton>
        <LinkButton color="secondary" disabled={true}>
          질문하러 가기
        </LinkButton>
      </div>
      <div className={styles.rinaPage__content}>
        FloatingButton
        {/* 플로팅 버튼으로 사용할 때 className을 floating로 설정 */}
        <FloatingButton size="md">질문 작성하기</FloatingButton>
        <FloatingButton size="sm">질문 작성하기</FloatingButton>
        <FloatingButton size="sm" className="floating">
          질문 작성하기
        </FloatingButton>
      </div>
      <div className={styles.rinaPage__content}>
        ShareButton
        <ShareButton
          color="var(--color-primary-400)"
          icon="link"
          iconColor="var(--color-white)"
        ></ShareButton>
        <ShareButton
          color="var(--color-yellow)"
          icon="kakao"
          iconColor="var(--color-black)"
        ></ShareButton>
        <ShareButton color="#1877F2" icon="facebook" iconColor="var(--color-white)"></ShareButton>
      </div>
    </div>
  );
}
