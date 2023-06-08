import React from "react";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

interface Props {
   count: number;
   itemsInPage: number;
}

export const Paging: React.FC<Props> = ({ count, itemsInPage }) => {
   const pages = Math.ceil(count / itemsInPage);
   const [searchParams, setSearchParams] = useSearchParams();

   const curPage = searchParams.get("page") || 1;

   const onPageClick = (page: string) => {
      setSearchParams((params) => {
         params.set("page", page);
         return params;
      });
   };

   if (pages <= 1) return null;

   const selectionVisiblePages = (curPage: number, pagesCount: number, siblingCount: number) => {
      const pages: number[] = [];
      const totalVisibleCount = siblingCount * 2 + 1;

      console.log(pagesCount);

      if (pagesCount < totalVisibleCount) {
         for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
         }

         return pages;
      }

      const fewSiblingsRight = pagesCount - curPage + 1 > siblingCount;
      const fewSiblingsLeft = pagesCount - curPage < pagesCount - siblingCount;

      if (fewSiblingsRight && fewSiblingsLeft) {
         for (let i = curPage - siblingCount; i <= curPage + siblingCount; i++) {
            pages.push(i);
         }
      }

      if (!fewSiblingsLeft) {
         for (let i = 1; i <= totalVisibleCount; i++) {
            pages.push(i);
         }
      }

      if (!fewSiblingsRight) {
         for (let i = pagesCount - totalVisibleCount + 1; i <= pagesCount; i++) {
            pages.push(i);
         }
      }

      return pages;
   };

   const visiblePages = selectionVisiblePages(+curPage, pages, 2);

   return (
      <Pagination className="mt-3">
         <Pagination.First onClick={() => onPageClick(`1`)} disabled={+curPage <= 1} />
         <Pagination.Prev onClick={() => onPageClick(`${+curPage - 1}`)} disabled={+curPage <= 1} />
         {visiblePages.map((i) => (
            <Pagination.Item key={i} active={i === +curPage} onClick={() => onPageClick(`${i}`)}>
               {i}
            </Pagination.Item>
         ))}
         <Pagination.Last onClick={() => onPageClick(`${pages}`)} disabled={+curPage >= +pages} />
         <Pagination.Next
            onClick={() => onPageClick(`${+curPage + 1}`)}
            disabled={+curPage >= +pages}
         />
      </Pagination>
   );
};
