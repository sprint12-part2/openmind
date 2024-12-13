import React, { useState, useEffect } from "react";
import { Pagination, Select } from "@components/ui";
import { fetchSubjects, fetchSubjectById, deleteSubject } from "@service/Subject"; // API 함수 임포트

export default function CharieSample() {
  const itemsPerPage = 8; // 한 페이지당 표시할 데이터 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 관리
  const [subjects, setSubjects] = useState([]); // API로 받아올 질문 대상 목록 상태
  const [totalItems, setTotalItems] = useState(0); // 전체 데이터 개수 상태
  const [sort, setSort] = useState("name");
  const [subjectId, setSubjectId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  // 현재 페이지 데이터 로드 함수
  useEffect(() => {
    async function loadSubjects() {
      try {
        // API 호출: 현재 페이지와 itemsPerPage 전달
        const data = await fetchSubjects(currentPage, itemsPerPage, sort);
        setSubjects(data.results); // 받아온 질문 대상 목록 저장
        setTotalItems(data.count); // 전체 데이터 개수 저장
      } catch (error) {
        console.error("질문 대상 목록을 불러오는 데 실패했습니다:", error);
      }
    }
    loadSubjects(); // 데이터 로드 함수 실행
  }, [currentPage, sort]); // currentPage가 변경될 때마다 실행

  // 페이지 변경 함수
  function handlePageChange(page) {
    setCurrentPage(page); // 현재 페이지 상태 업데이트
  }

  async function handleFetchSubject() {
    if (!subjectId) {
      setError("유효한 질문 대상 ID를 입력해주세요.");
      return;
    }
    try {
      setError("");
      const data = await fetchSubjectById(subjectId);
      setSelectedSubject(data);
    } catch (err) {
      setError("특정 질문 대상을 불러오는 데 실패했습니다.");
      setSelectedSubject(null);
    }
  }

  async function handleDeleteSubject() {
    if (!deleteId) {
      setDeleteMessage("유효한 질문 대상 ID를 입력해주세요.");
      return;
    }
    try {
      await deleteSubject(deleteId);
      setDeleteMessage(`ID ${deleteId} 삭제 성공`);
      setDeleteId("");
      setCurrentPage(1);
    } catch (err) {
      setDeleteMessage("삭제 실패. 다시 시도해주세요.");
    }
  }

  return (
    <div>
      <h1>**Pagination Test, 질문 대상 목록 조회**</h1>
      <Select value={sort} onChange={setSort}>
        <Select.Option value="name">이름순</Select.Option>
        <Select.Option value="time">최신순</Select.Option>
      </Select>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div>
        <h2>**특정 질문 대상 조회**</h2>
        <input
          type="text"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          placeholder="질문 대상 ID 입력"
        />
        <button onClick={handleFetchSubject}>조회</button>
        {error && <p>{error}</p>}
        {selectedSubject && <p>조회된 데이터: {selectedSubject.name}</p>}
      </div>
      <div>
        <h2>**특정 질문 대상 삭제**</h2>
        <input
          type="text"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
          placeholder="삭제할 질문 대상 ID 입력"
        />
        <button onClick={handleDeleteSubject}>삭제</button>
        {deleteMessage && <p>{deleteMessage}</p>}
      </div>
    </div>
  );
}
