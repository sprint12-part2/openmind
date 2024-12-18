import { MoreMenu } from "@components/Dropdown";

export function AnswerMenu({ mode, answer, onReject, onModify, onDelete, onDeleteQuestion }) {
  if (mode === "view") return null;

  return (
    <MoreMenu>
      <MoreMenu.Item icon="reject" onClick={onReject} disabled={answer?.isRejected}>
        거절하기
      </MoreMenu.Item>
      <MoreMenu.Item icon="edit" onClick={onModify}>
        수정하기
      </MoreMenu.Item>
      <MoreMenu.Item icon="close" onClick={onDelete} disabled={!answer}>
        답변삭제
      </MoreMenu.Item>
      <MoreMenu.Item icon="close" onClick={onDeleteQuestion}>
        질문삭제
      </MoreMenu.Item>
    </MoreMenu>
  );
}
