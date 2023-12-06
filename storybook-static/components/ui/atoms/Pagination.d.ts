import { FC } from 'react';
import React from 'react';
export interface PaginationProps {
    showRowsPerPage?: boolean;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    perPage: number;
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
    pages: number;
    maxPaginationNumbers: number;
    paginateOptions?: number[];
}
export declare const Pagination: FC<PaginationProps>;
