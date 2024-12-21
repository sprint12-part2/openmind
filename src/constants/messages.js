export const MESSAGES = {
  PERMISSION: "권한이 없습니다.",
  SUBJECT: {
    CONFIRM: "정말 피드를 삭제할까요?",
    SUCCESS: {
      CREATE: "피드를 생성했습니다.",
      DELETE: "피드를 삭제했습니다. 메인으로 이동합니다.",
    },
    ERROR: {
      CREATE: "피드 생성을 실패했습니다.",
      DELETE: "문제가 생겨, 삭제를 실패했습니다.",
      MAX_LENGTH: "이름은 12자 미만으로 입력해주세요.",
      EMPTY: "이름을 입력해주세요.",
    },
  },
  QUESTION: {
    CONFIRM: "정말 질문을 삭제할까요?",
    SUCCESS: {
      CREATE: "성공적으로 질문을 작성했습니다.",
      UPDATE: "질문을 수정했습니다.",
      DELETE: "질문을 삭제했습니다.",
    },
    ERROR: {
      CREATE: "문제가 생겨, 작성에 실패했습니다.",
      UPDATE: "문제가 생겨, 수정에 실패했습니다.",
      DELETE: "문제가 생겨, 삭제에 실패했습니다.",
      EMPTY: "질문을 한글자 이상 입력해주세요",
    },
  },
  ANSWER: {
    CONFIRM: "정말 답변을 삭제할까요?",
    SUCCESS: {
      CREATE: "답변을 작성했습니다.",
      UPDATE: "답변을 수정했습니다.",
      DELETE: "답변을 삭제했습니다.",
      REJECT: "거절했습니다.",
    },
    ERROR: {
      CREATE: "문제가 생겨, 작성에 실패했습니다.",
      UPDATE: "문제가 생겨, 수정에 실패했습니다.",
      DELETE: "문제가 생겨, 삭제에 실패했습니다.",
      REJECT: "문제가 생겨, 거절에 실패했습니다.",
      EMPTY: "답변을 한글자 이상 입력해주세요",
    },
  },
  SHARE: {
    SUCCESS: {
      COPY: "URL이 복사되었습니다",
    },
    ERROR: {
      COPY: "오류가 발생했습니다",
    },
  },
};
