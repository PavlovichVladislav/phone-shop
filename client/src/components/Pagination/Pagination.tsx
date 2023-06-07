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

   return (
      <Pagination className="mt-3">
         <Pagination.First />
         {Array(pages)
            .fill(null)
            .map((_, i) => (
               <Pagination.Item
                  key={i}
                  active={i + 1 === +curPage}
                  onClick={() => onPageClick(`${i + 1}`)}
               >
                  {i + 1}
               </Pagination.Item>
            ))}
         <Pagination.Last />
      </Pagination>
   );
};
