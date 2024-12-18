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
  const currentUrl = window.location.href; // 현재 URL 가져오기

  // 페이스북 SDK 초기화
  window.FB.init({
    appId: "2014957785686272", // 본인의 페이스북 앱 ID
    xfbml: true,
    version: "v15.0",
  });

  // 로그인되어 있지 않으면 로그인하도록 유도
  window.FB.getLoginStatus((response) => {
    if (response.status === "connected") {
      window.FB.ui(
        {
          method: "share",
          href: currentUrl,
        },
        function (response) {
          if (response && !response.error_message) {
            alert("공유 성공!");
          } else {
            alert("공유 실패");
          }
        },
      );
    } else {
      window.FB.login();
    }
  });
};
