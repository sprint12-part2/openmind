/**
 * @module 공유 유틸리티
 * URL 복사, 카카오톡 공유, 페이스북 공유 기능을 제공하는 모듈입니다.
 */
import { isMobile } from "react-device-detect";
import { Notify } from "@components/Toast";

const urlPath = window.location.pathname;
const currentUrl = import.meta.env.VITE_BASE_URL + urlPath;

/**
 * 토스트 알림을 표시합니다.
 *
 * @param {string} type - 표시할 메시지의 타입 ("seccess" 또는 "error")
 */
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

/**
 * 현재 페이지의 URL을 클립보드에 복사합니다.
 *
 * @async
 * @function copyUrl
 * @throws 복사 실패 시 오류 토스트 메시지를 표시합니다.
 */
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

/**
 * 카카오톡을 통해 피드를 공유합니다.
 *
 * @async
 * @function shareKakao
 * @param {string} name - 공유할 피드의 사용자 이름
 */
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

/**
 * 현재 URL을 페이스북에 공유합니다.
 * 모바일과 PC 환경을 구분하여 각각 적합한 방식으로 처리합니다.
 *
 * @async
 * @function shareFacebook
 * @throws 공유 실패나 로그인 실패 시 경고 메시지를 표시합니다.
 */
export const shareFacebook = async () => {
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
              alert("공유 성공 🎉");
            } else {
              alert("공유 실패 🥲");
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
                  alert("공유 성공 🎉");
                } else {
                  alert("공유 실패 🥲");
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
