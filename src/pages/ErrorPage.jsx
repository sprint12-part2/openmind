import { Error } from "@components/Error";
import { useRouteError } from "react-router-dom";

const data = {
  404: {
    title: "페이지를 찾을 수 없어요",
    message: "잘못된 주소 또는 없는 페이지입니다.",
  },
  500: {
    title: "서버 오류가 발생했어요",
    message: "현재 요청을 처리할 수 없어요. 잠시 후 다시 시도해 주세요.",
  },
  403: {
    title: "접근이 제한되었어요",
    message: "이 페이지에 접근할 권한이 없습니다.",
  },
  400: {
    title: "잘못된 요청이에요",
    message: "요청에 문제가 있어요. 입력 값을 확인해 주세요.",
  },
  default: {
    title: "문제가 발생했어요",
    message: "새로고침하거나 나중에 다시 시도해 주세요.",
  },
};
export default function ErrorPage() {
  const error = useRouteError();

  const { title, message } = data[error.status] || data.default;

  return <Error title={title} message={message} />;
}
