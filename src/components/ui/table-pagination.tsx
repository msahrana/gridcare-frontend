/* biome-ignore-all lint/suspicious/noArrayIndexKey: Ellipsis items require positional keys */

'use client';

import type { Dispatch, SetStateAction } from 'react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './pagination';

const getButtonArray = (
    totalPages: number,
    page: number,
): (number | 'ellipsis')[] => {
    // 1 - 7 pages
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // First pages
    // 1 2 3 4 5 ... 20
    if (page <= 4) {
        return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }

    // Last pages
    // 1 ... 16 17 18 19 20
    if (page >= totalPages - 3) {
        return [
            1,
            'ellipsis',
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    // Middle pages
    // 1 ... 9 10 11 ... 20
    return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages];
};

interface Props {
    totalPages: number;
    page: number;
    handlePageChange: Dispatch<SetStateAction<number>>;
}

const TablePagination = ({ totalPages, page, handlePageChange }: Props) => {
    if (totalPages <= 1) {
        return null;
    }

    const goToPage = (nextPage: number) => {
        if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
            return;
        }

        handlePageChange(nextPage);
    };

    const buttonArray = getButtonArray(totalPages, page);

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => goToPage(page - 1)}
                        aria-disabled={page === 1}
                        className={
                            page === 1
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {buttonArray.map((item, index) =>
                    item === 'ellipsis' ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item}>
                            <PaginationLink
                                onClick={() => goToPage(item)}
                                isActive={page === item}
                                aria-current={
                                    page === item ? 'page' : undefined
                                }
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                {/* Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => goToPage(page + 1)}
                        aria-disabled={page === totalPages}
                        className={
                            page === totalPages
                                ? 'pointer-events-none opacity-50'
                                : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default TablePagination;
