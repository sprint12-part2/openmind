import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchSubjects } from "@service/Subject";
import { UserCard, Pagination, Select } from "@components/ui";
import { getItemsPerPage } from "./itemPerPage";
import styles from "./PostList.module.css";

export default function PostList() {
  const [subjects, setSubjects] = useState([]); // 질문자 목록 상태
  const [totalItems, setTotalItems] = useState(0); // 전체 항목 수
  const [itemsPerPage, setItemsPerPage] = useState(() => getItemsPerPage()); // 화면 크기에 맞는 초기값
  const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리 파라미터

  // 현재 페이지와 정렬 기준을 URL에서 가져옴
  const currentPage = parseInt(searchParams.get("page") || "1", 10); // URL에서 현재 페이지 값 가져오고 없으면 1로 설정
  const sort = searchParams.get("sort") || "time"; // URL에서 정렬기준 값 가져오기 (기본값: 최신순)

  // 화면 크기 변화 감지 및 itemsPerPage 업데이트
  useEffect(() => {
    function handleResize() {
      const newItemsPerPage = getItemsPerPage(); // 화면에 맞는 새로운 itemsPerPage 값 계산

      // itemsPerPage 업데이트
      setItemsPerPage((prevItemsPerPage) => {
        if (prevItemsPerPage !== newItemsPerPage) {
          // 페이지 재계산: 현재 페이지의 첫 번째 아이템의 인덱스를 유지
          const firstItemIndex = (currentPage - 1) * prevItemsPerPage;

          // 새 페이지 번호 계산
          const newPage = Math.min(
            Math.floor(firstItemIndex / newItemsPerPage) + 1,
            Math.ceil(totalItems / newItemsPerPage), // 최대 페이지 초과 방지
          );

          // 페이지 번호가 변경될 때만 setSearchParams 업데이트
          if (newPage !== currentPage) {
            setSearchParams({ page: newPage, sort });
          }

          return newItemsPerPage;
        }
        return prevItemsPerPage;
      });
    }

    window.addEventListener("resize", handleResize); // 화면 리사이즈 이벤트 리스너 등록
    return () => window.removeEventListener("resize", handleResize); // 이벤트 리스너 제거
  }, [currentPage, totalItems, sort, setSearchParams]);

  // 질문자 목록 가져오기 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await fetchSubjects(currentPage, itemsPerPage, sort); // API 호출
        setSubjects(data.results); // 받아온 데이터 설정
        setTotalItems(data.count); // 총 데이터 수 설정
      } catch (err) {
        console.error("질문자 목록을 불러오는 데 실패했습니다.", err); // 에러 로그
      }
    }

    loadSubjects();
  }, [currentPage, itemsPerPage, sort]); // 상태 변경 시 실행

  // 페이지 변경 함수
  function handlePageChange(page) {
    setSearchParams({ page, sort }); // 페이지 번호를 URL에 업데이트
  }

  // 정렬 기준 변경 함수
  function handleSortChange(value) {
    setSearchParams({ page: 1, sort: value }); // 정렬 기준 변경 시 페이지를 1로 설정
  }

  // 데이터 출력
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>누구에게 질문할까요?</h1>
        <Select value={sort} onChange={handleSortChange} className={styles.sortBar}>
          <Select.Option value="name">이름순</Select.Option>
          <Select.Option value="time">최신순</Select.Option>
        </Select>
      </div>

      <ul className={styles.userCardList} role="list">
        {subjects.map((subject) => (
          <li key={subject.id} role="listitem" className={styles.userCardItem}>
            <Link to={`/post/${subject.id}`} aria-label={`${subject.name}의 질문 목록으로 이동`}>
              <UserCard
                name={subject.name}
                imageSource={subject.imageSource || "default.jpg"}
                questionCount={subject.questionCount}
              />
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.paginationBar}>
        <Pagination
          totalItems={totalItems} // 전체 데이터 개수
          itemsPerPage={itemsPerPage} // 페이지 당 데이터 개수
          currentPage={currentPage} // 현재 페이지
          onPageChange={handlePageChange} // 페이지 변경 핸들러
        />
      </div>
    </div>
  );
}
