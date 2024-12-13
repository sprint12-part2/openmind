import styles from "./PostList.module.css";
import React, { useState, useEffect } from "react";
import { fetchSubjects } from "@service/Subject";

export default function PostList() {
  const [subjects, setSubjects] = useState([]); // 질문자 목록 상태

  // 질문자 목록 가져오기 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await fetchSubjects(); // 기본값: page = 1, itemsPerPage = 8, sort = "time"
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
        <div key={subject.id}>
          <p>name: {subject.name}</p>
          <p>imageSource: {subject.imageSource}</p>
          <p>questionCount: {subject.questionCount}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
