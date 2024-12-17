import { InputField } from "@components/ui.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPageInputForm.module.css";
import { LinkButton } from "@components/Button/index.js";
import { useFeed } from "@context/FeedContext";
import { Notify } from "@components/Toast";

export default function MainPageInputForm() {
  const [name, setName] = useState("");
  const trimmedName = name.trim();

  const { createFeed, isLoading } = useFeed();

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Input값 유효성 검증
      if (trimmedName.length > 12) {
        Notify({ type: "error", message: "이름은 12자 미만으로 입력해주세요." });
        return;
      }
      if (name.trim()) {
        const data = await createFeed(trimmedName);

        Notify({ type: "success", message: "피드를 생성했습니다." });
        navigate(`/post/${data.id}/answer`);
      } else {
        Notify({ type: "error", message: "이름을 입력해주세요." });
      }
    } catch (e) {
      if (e.response) {
        // console.log(e.response.status);
        // console.log(e.response.data);
        Notify({ type: "error", message: "피드 생성을 실패했습니다." });
      } else {
        // console.log("리퀘스트가 실패했습니다");
      }
    }
    setName("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputField value={name} onChange={handleNameChange} />
      <LinkButton type="submit" color="secondary" disabled={isLoading}>
        {isLoading ? "로딩 중 ..." : "질문 받기"}
      </LinkButton>
    </form>
  );
}
