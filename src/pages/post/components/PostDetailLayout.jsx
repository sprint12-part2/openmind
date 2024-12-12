import { Outlet } from "react-router-dom";
import PostDetailHeader from "./PostDetailHeader";
import styles from "./PostDetailLayout.module.css";

export default function PostDetailLayout() {
  return (
    <div className={styles.container}>
      <div>한솔님, 질문, 답변페이지 레이아웃 작업 구역</div>
      <PostDetailHeader />

      <Outlet />
    </div>
  );
}
