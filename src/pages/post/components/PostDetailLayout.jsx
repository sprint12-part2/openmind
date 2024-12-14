import { Outlet } from "react-router-dom";
import PostDetailHeader from "./PostDetailHeader";
import styles from "./PostDetailLayout.module.css";

export default function PostDetailLayout() {
  return (
    <div className={styles.detail__container}>
      {/* 질문, 답변페이지 레이아웃 작업 구역 */}

      <header className={styles.detail__header}>
        <PostDetailHeader />
      </header>

      <main className={styles.detail__list}>
        <Outlet />
      </main>
    </div>
  );
}
