import { Notify } from "@components/Toast";
import { useEffect } from "react";

const urlPath = window.location.pathname;
const currentUrl = import.meta.env.VITE_BASE_URL + urlPath;

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

export const shareKakao = async (name) => {
  if (window.Kakao) {
    window.Kakao.Share.createDefaultButton({
      container: "#kakao-link-btn",
      objectType: "feed",
      content: {
        title: `OPENMIND-<${name}>님의 피드 바로가기`,
        description: "", // 공유 설명
        imageUrl: "https://iamhs232.cafe24.com/img/seo_kakao_share.jpg",
        link: {
          mobileWebUrl: `${currentUrl}`,
          webUrl: `${currentUrl}`,
        },
      },
    });
  }
};

export const shareFacebook = async () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    "페이스북 공유하기",
    "width=600,height=800,location=no,status=no,scrollbars=yes", //새창 뜨는 것 조절 (없어도 작동됨)
  );
};
