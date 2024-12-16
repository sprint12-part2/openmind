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
        {/* 플로팅 버튼으로 사용할 때 floating 값을 true로 설정 
            원하는 위치를 top,right,bottom,left 를 사용해서 위치 지정 가능 기본 위치는 right:20px, bottom:20px
        */}
        <FloatingButton size="md" floating={false}>
          질문 작성하기
        </FloatingButton>
        <FloatingButton size="sm" floating={false}>
          질문 작성하기
        </FloatingButton>
        <FloatingButton size="sm" floating={true} position={{ bottom: "50px", left: "50px" }}>
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
