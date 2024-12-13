import styles from "./PostList.module.css";
import React, { useState, useEffect } from "react";
import { fetchSubjects } from "@service/Subject";
import { UserCard } from "@components/ui";

export default function PostList() {
  const [subjects, setSubjects] = useState([]); // 질문자 목록 상태

  // 질문자 목록 가져오기 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await fetchSubjects(1, 8, "name"); // 기본값: page = 1, itemsPerPage = 8, sort = "time"
        setSubjects(data.results); // 받아온 데이터 설정
        console.log("불러온 데이터:", data.results); // 확인용 로그
      } catch (err) {
        console.error("질문자 목록을 불러오는 데 실패했습니다.", err); // 에러 로그
      }
    }

    loadSubjects();
  }, []);

  // 데이터 출력
  return (
    <div className={styles.container}>
      {subjects.map((subject) => (
        <UserCard
          key={subject.id}
          name={subject.name}
          imageSource={subject.imageSource || "default.jpg"} // 기본 이미지
          questionCount={subject.questionCount}
        />
      ))}
    </div>
  );
}
