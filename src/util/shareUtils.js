import { isMobile } from "react-device-detect";
import { Notify } from "@components/Toast";

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
  //const currentUrl = window.location.href; // 현재 URL 가져오기

  if (isMobile) {
    // 모바일 환경: 로그인 상태 확인 및 공유
    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        // 이미 로그인된 상태에서 공유
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
        // 로그인 필요
        window.FB.login((loginResponse) => {
          if (loginResponse.authResponse) {
            // 로그인 성공 후 바로 공유
            window.FB.ui(
              {
                method: "share",
                href: currentUrl,
              },
              function (shareResponse) {
                if (shareResponse && !shareResponse.error_message) {
                  alert("공유 성공!");
                } else {
                  alert("공유 실패");
                }
              },
            );
          } else {
            alert("로그인을 취소했습니다.");
          }
        });
      }
    });
  } else {
    // PC 환경: 단순 팝업 공유
    const popup = window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      "페이스북 공유하기",
      "width=800,height=800,location=no,status=no,scrollbars=yes",
    );

    if (popup) {
      popup.focus();
    } else {
      alert("팝업이 차단되었습니다. 팝업 차단을 해제해주세요.");
    }
  }
};
