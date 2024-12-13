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
  const { mutate: handleLike } = useLike();

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
                  onCreate={(content) =>
                    create({ questionId: question.id, content, isRejected: "false" })
                  }
                  onUpdate={(content) =>
                    update({
                      answerId: question.answer?.id,
                      content,
                      isRejected: "false",
                    })
                  }
                  onDelete={() =>
                    remove({ questionId: question.id, answerId: question.answer?.id })
                  }
                  onReject={() =>
                    reject({
                      questionId: question.id,
                      answerId: question.answer?.id,
                      content: "reject",
                      isRejected: true,
                    })
                  }
                  onLike={() => handleLike({ id: question.id, type: "like" })}
                  onDislike={() => handleLike({ id: question.id, type: "dislike" })}
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
