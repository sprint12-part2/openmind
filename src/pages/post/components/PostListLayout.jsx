import { Outlet } from "react-router-dom";
import PostListHeader from "./PostListHeader";
import styles from "./PostListLayout.module.css";

export default function PostListLayout() {
  return (
    <div className={styles.container}>
      <div>리나님, 피드 리스트페이지 레이아웃 설정하는곳</div>
      <PostListHeader />

      <Outlet />
    </div>
  );
}
