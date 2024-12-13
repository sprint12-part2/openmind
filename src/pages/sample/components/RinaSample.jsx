import { LinkButton, FloatingButton, ShareButton } from "@components/Button";

export default function RinaSample() {
  return (
    <div>
      RinaSample
      <LinkButton color="primary" size="sm">
        질문하러 가기
      </LinkButton>
      <LinkButton color="primary" size="md">
        질문하러 가기
      </LinkButton>
      <LinkButton color="secondary" size="md">
        질문하러 가기
      </LinkButton>
      <ShareButton color="#1877F2"></ShareButton>
      <FloatingButton>질문 작성하기</FloatingButton>
    </div>
  );
}
