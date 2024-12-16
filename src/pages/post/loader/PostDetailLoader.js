import { fetchSubjectById } from "@service/Subject";

export async function loader({ params }) {
  const { id } = params;

  const data = await fetchSubjectById(id);
  return data;
}
