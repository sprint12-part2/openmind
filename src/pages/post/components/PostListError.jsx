import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostListError.module.css";

export function PostListError({ message }) {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleGoHome = () => {
    navigate("/"); // 홈으로 이동
  };
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorBackground}></div>
      <h1 className={styles.errorTitle}>문제가 발생했어요</h1>
      <p className={styles.errorMessage}>{message}</p>
      <div className={styles.buttonContainer}>
        <button onClick={handleGoHome} className={styles.goHomeButton}>
          홈으로 가기
        </button>
      </div>
    </div>
  );
}
