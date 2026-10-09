'use client';

import { useState } from 'react';
import { useSuspenseGetAllRestorations } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import GetTechnicianRestoration from '@/components/modules/restoration/GetTechnicianRestoration';

const TechnicianRestorations = () => {
    const [searchInput, setSearchInput] = useState('');

    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 1000);

    const params = {
        searchTerm,
        page,
        limit: 3,
    };

    const { data } = useSuspenseGetAllRestorations(params);

    const restorations = data?.data?.data ?? [];

    const totalPages = data?.data?.meta?.totalPage ?? 1;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Restorations</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search restorations..."
                    />
                </div>
            </div>

            {/* Table */}
            <GetTechnicianRestoration data={restorations} />

            {/* Pagination */}
            <div className="my-5">
                <TablePagination
                    page={page}
                    totalPages={totalPages}
                    handlePageChange={setPage}
                />
            </div>
        </div>
    );
};

export default TechnicianRestorations;
