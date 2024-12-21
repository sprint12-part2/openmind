import { Link } from "react-router-dom";
import { UserCard } from "@components/ui";
import { PostListError } from "./PostListError";
import styles from "./PostList.module.css";

/**
 * PostList 컴포넌트: 데이터를 렌더링만 담당하는 UI 컴포넌트
 * - props를 통해 데이터를 전달받아 렌더링
 * - 상태 관리나 데이터 로직은 PostListPage에서 처리됨
 */

export default function PostList({ subjects }) {
  if (subjects.length === 0) {
    return <PostListError message="검색 결과가 없습니다. 다른 조건으로 검색해보세요." />;
  }
  return (
    <div className={styles.container}>
      <ul className={styles.userCardList} role="list">
        {subjects.map((subject) => (
          <li
            key={subject.id} // 각 아이템의 고유 키
            role="listitem" // 접근성 개선을 위한 속성
            className={styles.userCardItem}
          >
            <Link
              to={`/post/${subject.id}`} // 해당 질문자 페이지로 이동
              aria-label={`${subject.name}의 질문 목록으로 이동`} // 접근성 레이블
            >
              <UserCard
                name={subject.name} // 질문자 이름
                imageSource={subject.imageSource} // 프로필 이미지
                questionCount={subject.questionCount} // 질문 개수
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
