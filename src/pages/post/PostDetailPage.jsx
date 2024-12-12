import { useParams } from "react-router-dom";
import Questions from "./components/Questions";

export default function PostDetailPage() {
  const { id } = useParams();

  return (
    <div>
      질문 페이지
      <Questions />
    </div>
  );
}
