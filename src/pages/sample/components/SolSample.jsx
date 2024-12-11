import { Badge } from "@components/Badge";

export default function SolSample() {
  const answer = [
    {
      id: 6969,
      questionId: 15356,
      content: "답변해드려요",
      isRejected: false,
      createdAt: "2024-12-09T13:11:31.525185Z",
    },
  ];

  const status = answer && !answer.isRejected ? "completed" : "incomplete";
  return (
    <>
      <Badge status={status} />
    </>
  );
}
