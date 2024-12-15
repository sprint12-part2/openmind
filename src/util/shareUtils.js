import { Notify } from "@components/Toast";

const showToast = (type) => {
  const data = {
    seccess: {
      message: "URL이 복사되었습니다",
    },
    error: {
      type: "error",
      message: "오류가 발생했습니다",
    },
  };

  const message = data[type] || data.error;
  Notify(message);
};

export const copyUrl = async () => {
  try {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    showToast("seccess");
  } catch (error) {
    console.error("Failed to copy URL:", error);
    showToast("error");
  }
};

export const shareKakao = async () => {
  alert("카카오톡 공유하기");
};

export const shareFacebook = async () => {
  alert("페이스북 공유하기");
};
