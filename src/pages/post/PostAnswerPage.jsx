import { useParams } from "react-router-dom";
import Questions from "./components/Questions";

export default function PostAnswerPage() {
  const { id } = useParams();

  return (
    <div>
      답변페이지
      <Questions />
    </div>
  );
}
