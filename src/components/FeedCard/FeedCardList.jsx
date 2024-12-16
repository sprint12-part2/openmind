import { motion } from "motion/react";
import emptyIcon from "@assets/img/common/icon_empty.svg";
import styles from "./FeedCardList.module.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1 },
};

export function FeedCardList({ data, children }) {
  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <img src={emptyIcon} alt="아직 질문이 없습니다." />
      </div>
    );
  }
  return (
    <motion.ul className={styles.list} variants={container} initial="hidden" animate="show">
      {data.map((question) => (
        <motion.li key={question.id} variants={item}>
          {children(question)}
        </motion.li>
      ))}
    </motion.ul>
  );
}
