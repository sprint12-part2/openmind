import { Pagination } from "@components/ui";
import styles from "./PostListPagination.module.css";

export default function PostListPagination({ totalItems, currentPage, onPageChange }) {
  return (
    <div className={styles.paginationBar}>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={8}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
