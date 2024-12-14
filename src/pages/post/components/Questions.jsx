import { useRouteLoaderData } from "react-router-dom";
import { Icon } from "@components/ui";
import { FeedCard } from "@components/FeedCard";
import emptyIcon from "@assets/img/common/icon_empty.svg";
import styles from "./Questions.module.css";
import useLike from "./useLike";
import useAnswer from "./useAnswer";

export default function Questions({ count, data, mode = "view" }) {
  const userInfo = useRouteLoaderData("post");
  const { create, update, remove, reject, isPending } = useAnswer();
  const { mutate: reaction } = useLike();

  function handleCreate({ questionId, content }) {
    create({ questionId, content, isRejected: "false" });
  }

  function handleUpdate({ answerId, content }) {
    update({
      answerId,
      content,
      isRejected: "false",
    });
  }

  function handleDelete({ questionId, answerId }) {
    remove({ questionId, answerId });
  }

  function handleReject({ questionId, answerId }) {
    reject({
      questionId,
      answerId,
      content: "reject",
      isRejected: true,
    });
  }

  function handleLike({ questionId, type }) {
    reaction({ questionId, type });
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Icon name="message" />
        {count > 0 ? `${count}개의 질문이 있습니다.` : "아직 질문이 없습니다"}
      </header>

      {data.length ? (
        <ul className={styles.list}>
          {data.map((question) => {
            return (
              <li key={question.id}>
                <FeedCard
                  isPending={isPending}
                  question={question}
                  mode={mode}
                  feedOwner={userInfo}
                  onCreate={handleCreate}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onReject={handleReject}
                  onLike={handleLike}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.empty}>
          <img src={emptyIcon} alt="아직 질문이 없습니다." />
        </div>
      )}
    </div>
  );
}
