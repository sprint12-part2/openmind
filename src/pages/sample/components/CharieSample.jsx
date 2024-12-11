import React, { useState } from "react";
import { Pagination } from "@components/Pagination";

export default function CharieSample() {
  const totalItems = 100;
  const itemsPerPage = 8;

  function handlePageChange(page) {
    console.log(`현재 페이지: ${page}`);
    setCurrentPage(page);
  }

  return (
    <div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
