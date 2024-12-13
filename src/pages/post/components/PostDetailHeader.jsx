import { useLoaderData } from "react-router-dom";
import styles from "./PostDetailHeader.module.css";

export default function PostDetailHeader() {
  //const data = useLoaderData(); // 이렇게 쓰셔도 되고, 분해하셔도 되욤
  const { name, imageSource } = useLoaderData();
  console.log(name);

  return (
    <div className={styles.container}>
      PostDetailHeader : 한솔님 작업구역 (답변, 질문페이지 공통헤더)
    </div>
  );
}
