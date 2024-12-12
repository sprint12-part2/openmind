import { toast } from "react-toastify";

/**
 * 일반 토스트 알림을 표시합니다.
 *
 * @function notify
 * @param {string} message - 표시할 메시지
 * @example
 * notify("일반 알림 메시지입니다.");
 */
export const notify = (message) => {
  toast(message);
};

/**
 * 성공 메시지를 포함한 토스트 알림을 표시합니다.
 *
 * @function notifySuccess
 * @param {string} message - 성공 알림에 표시할 메시지
 * @example
 * notifySuccess("성공적으로 작업이 완료되었습니다.");
 */
export const notifySuccess = (message) => {
  toast.success(message);
};

/**
 * 오류 메시지를 포함한 토스트 알림을 표시합니다.
 *
 * @function notifyError
 * @param {string} message - 오류 알림에 표시할 메시지
 * @example
 * notifyError("작업 중 오류가 발생했습니다.");
 */
export const notifyError = (message) => {
  toast.error(message);
};

/**
 * 정보 메시지를 포함한 토스트 알림을 표시합니다.
 *
 * @function notifyInfo
 * @param {string} message - 정보 알림에 표시할 메시지
 * @example
 * notifyInfo("이 작업은 곧 완료됩니다.");
 */
export const notifyInfo = (message) => {
  toast.info(message);
};
