import { useEffect, useState } from "react";

const PAGE_SIZE = 10;

/** Slices `items` into pages of `PAGE_SIZE`, resetting to page 1 whenever the filtered list shrinks below the current page. */
export function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return { page, setPage, pageItems, totalItems: items.length, pageSize: PAGE_SIZE };
}
