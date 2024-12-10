import { useParams } from "react-router-dom";

export default function PostDetailPage() {
  const { id } = useParams();
  return <div>PostDetailPage: {id}</div>;
}
