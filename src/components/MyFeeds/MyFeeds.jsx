import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useFeed } from "@context/FeedContext";
import { Modal } from "@components/Modal";
import { Avatar } from "@components/Avatar";
import { fromNow } from "@util/format";
import styles from "./MyFeeds.module.css";

export const MyFeeds = forwardRef(function MyFeeds(_, ref) {
  const { feeds } = useFeed();

  return (
    <Modal ref={ref} title="생성한 피드" icon="message">
      <div className={styles.container}>
        {feeds.length === 0 ? (
          <div className={styles.empty}>생성한 피드가 없습니다.</div>
        ) : (
          <ul className={styles.list}>
            {feeds.map((feed) => (
              <li key={feed.id} className={styles.item}>
                <Link className={styles.card} to={`/post/${feed.id}/answer`}>
                  <div className={styles.avatar}>
                    <Avatar src={feed.imageSource} alt={feed.name} />
                  </div>
                  <div className={styles.info}>
                    <div className={styles.name}>{feed.name}</div>
                    <div className={styles.date}>{fromNow(feed.createdAt, new Date())}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
});
