import { useParams } from "react-router-dom";

export default function PostAnswerPage() {
  const { id } = useParams();
  return <div>PostAnswerPage: {id}</div>;
}
