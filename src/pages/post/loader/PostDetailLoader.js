import axios from "axios";

export async function loader() {
  // TODO : api 추상화 되면 교체예정
  const res = await axios.get("https://openmind-api.vercel.app/12-2/subjects/9281/");
  const { data } = res;
  return data;
}
