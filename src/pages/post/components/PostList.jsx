import React from "react";
import { Link } from "react-router-dom";
import { UserCard, Pagination, Select } from "@components/ui";
import styles from "./PostList.module.css";

/**
 * PostList 컴포넌트: 데이터를 렌더링만 담당하는 UI 컴포넌트
 * - props를 통해 데이터를 전달받아 렌더링
 * - 상태 관리나 데이터 로직은 PostListPage에서 처리됨
 */

export default function PostList({
  subjects, // 질문자 목록 데이터 배열
  totalItems, // 전체 데이터 수
  currentPage, // 현재 페이지 번호
  onPageChange, // 페이지 변경 핸들러 함수
  onSortChange, // 정렬 기준 변경 핸들러 함수
  sort, // 현재 정렬 기준 ("name" 또는 "time")
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>누구에게 질문할까요?</h1>

        <Select
          value={sort} // 현재 선택된 정렬 기준
          onChange={onSortChange} // 정렬 기준 변경 시 호출
          className={styles.sortBar}
        >
          <Select.Option value="name">이름순</Select.Option>
          <Select.Option value="time">최신순</Select.Option>
        </Select>
      </div>

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

      <div className={styles.paginationBar}>
        <Pagination
          totalItems={totalItems} // 전체 데이터 수
          itemsPerPage={8} // 한 페이지당 표시할 데이터 개수
          currentPage={currentPage} // 현재 페이지 번호
          onPageChange={onPageChange} // 페이지 변경 핸들러
        />
      </div>
    </div>
  );
}
