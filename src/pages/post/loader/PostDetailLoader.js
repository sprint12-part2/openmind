import { fetchSubjectById } from "@service/Subject";

export async function loader({ params }) {
  const { id } = params;
  const subjectId = Number(id);

  const data = await fetchSubjectById(subjectId);

  return data;
}
