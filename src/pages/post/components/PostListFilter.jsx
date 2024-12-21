import { Select } from "@components/ui";
import styles from "./PostListFilter.module.css";

export default function PostListFilter({ sort, onSortChange }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>누구에게 질문할까요?</h1>
      <Select value={sort} onChange={onSortChange} className={styles.sortBar}>
        <Select.Option value="name">이름순</Select.Option>
        <Select.Option value="time">최신순</Select.Option>
      </Select>
    </div>
  );
}
