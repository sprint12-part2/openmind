import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./custom-toast.css";

/**
 * Toast 컴포넌트
 *
 * 이 컴포넌트는 `react-toastify` 라이브러리의 `ToastContainer`를 사용하여
 * 사용자 정의 설정으로 구성된 토스트 메시지 컨테이너를 렌더링한다.
 *
 * @component
 * @example
 * // React 애플리케이션에서 사용 예제:
 * import { Toast, notify } from "@components/Toast";
 *
 * function App() {
 *   return (
 *     <>
 *       <Toast />
 *     </>
 *   );
 * }
 *
 * @returns {JSX.Element} 사용자 정의된 `ToastContainer`를 반환합니다.
 */

export function Toast() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
      limit={3}
    />
  );
}
