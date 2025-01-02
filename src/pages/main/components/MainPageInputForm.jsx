import { InputField } from "@components/ui.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPageInputForm.module.css";
import { LinkButton } from "@components/Button/index.js";
import { useFeed } from "@context/FeedContext";
import { Notify } from "@components/Toast";
import { MESSAGES } from "@constants/messages";

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
        Notify({ type: "error", message: MESSAGES.SUBJECT.ERROR.MAX_LENGTH });
        return;
      }
      if (trimmedName) {
        const data = await createFeed(trimmedName);

        Notify({ type: "success", message: MESSAGES.SUBJECT.SUCCESS.CREATE });
        navigate(`/post/${data.id}/answer`);
      } else {
        Notify({ type: "error", message: MESSAGES.SUBJECT.ERROR.EMPTY });
      }
    } catch (e) {
      if (e.response) {
        Notify({ type: "error", message: MESSAGES.SUBJECT.ERROR.CREATE });
      }
    }
    setName("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputField icon="person" value={name} onChange={handleNameChange} />
      <LinkButton type="submit" color="secondary" disabled={isLoading}>
        {isLoading ? "로딩 중 ..." : "질문 받기"}
      </LinkButton>
    </form>
  );
}
