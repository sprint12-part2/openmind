import { Outlet } from "react-router-dom";
import PostListHeader from "./PostListHeader";
import styles from "./PostListLayout.module.css";

export default function PostListLayout() {
  return (
    <>
      <header className={styles.header}>
        <PostListHeader />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
