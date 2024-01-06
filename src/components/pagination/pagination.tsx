import ReactPaginate from "react-paginate";
import React, { useState, useEffect } from "react";
import styles from "./pagination.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Select from "react-select";

type PaginationProps = {
  currentPage?: number;
  filterRowsCount: number;
  totalRows?: number;
  ClassNames?: string;
  itemsPerPage: number;
  onPageChange?: (newPage: number, newPageSize: number) => void;
  fetchdata?: (currentPage: number, pageSize: number, searchText: string) => void;
  searchText?: string;
};

export default function Pagination(props: PaginationProps) {
  const {
    filterRowsCount,
    totalRows,
    itemsPerPage,
    ClassNames,
    currentPage,
    fetchdata,
    searchText,
    onPageChange,
  } = props;

  const [pageCount, setPageCount] = useState(Math.ceil((totalRows as number) / itemsPerPage));
  const [pageSize, setPageSize] = useState(itemsPerPage);

  useEffect(() => {
    const newPageCount = Math.ceil((totalRows as number) / itemsPerPage);
    setPageCount(newPageCount);
    setPageSize(itemsPerPage)
  }, [totalRows, itemsPerPage]);

  const handlePageClick = (selected: { selected: number }) => {
    const newIndex = selected.selected + 1;

    if (onPageChange) {
      onPageChange(newIndex, pageSize);
      const newurl = new URL(window.location.href); newurl.searchParams.set('currentPage', newIndex.toString());
      window.history.pushState({}, "", newurl.toString());
    }
    if (fetchdata) {
      fetchdata(newIndex, pageSize, searchText as string);
    }
  };
  const options = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    // Add more options as needed
  ];

  const handlePageSizeChange = (pagesize: any) => {
    const newPageSize = parseInt(pagesize, 10);

    if (!isNaN(newPageSize)) {
      const newPage = currentPage
        ? Math.ceil(((currentPage - 1) * pageSize + 1) / newPageSize)
        : 1; // Default to 1 if currentPage is undefined

      setPageSize(newPageSize);
      const newurl = new URL(window.location.href); newurl.searchParams.set('pageSize', newPageSize.toString());
      window.history.pushState({}, "", newurl.toString());

      if (onPageChange) {
        onPageChange(newPage, newPageSize);

        const newurl = new URL(window.location.href); newurl.searchParams.set('currentPage', "1");
        window.history.pushState({}, "", newurl.toString());
      }

      if (fetchdata && searchText !== undefined) {
        fetchdata(newPage, newPageSize, searchText);
      }
    }
  };


  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pageInfo}>
        {currentPage && filterRowsCount && totalRows
          ? `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(
            (currentPage - 1) * pageSize + pageSize,
            totalRows
          )} out of ${totalRows} entries`
          : ""}
        <label className={styles.pageSize} htmlFor="pageSizeSelect">Page Size: </label>
        <div>
          <Select
            id="pageSizeSelect"
            value={{ value: pageSize, label: pageSize.toString() }}
            onChange={(selectedOption) => handlePageSizeChange(selectedOption?.value)}
            options={options}
            className={`${styles.pageSizeBox} ${pageSize > 10 ? styles.largePageSizeMenu : ''}`}
            menuPlacement={pageSize > 0 ? 'top' : 'auto'}
          />
        </div>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel={<FaChevronRight />}
        pageCount={pageCount}
        pageRangeDisplayed={2}
        className={ClassNames}
        previousLabel={<FaChevronLeft />}
        marginPagesDisplayed={1}
        nextClassName={styles.pageitem}
        pageClassName={styles.pageitem}
        activeClassName={styles.active}
        breakClassName={styles.pageitem}
        disabledClassName={styles.disabled}
        nextLinkClassName={styles.pagelink}
        pageLinkClassName={styles.pagelink}
        previousClassName={styles.pageitem}
        breakLinkClassName={styles.pagelink}
        containerClassName={styles.pagination}
        previousLinkClassName={styles.pagelink}
        onPageChange={handlePageClick}
        forcePage={currentPage ? currentPage - 1 : undefined}
      />
    </div>
  );
}
