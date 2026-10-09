'use client';

import { useState } from 'react';
import useDebounce from '@/hooks/debounce.hook';
import { useSuspenseGetAllOutageAssignments } from '@/hooks';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import GetTechnicianOutageAssignments from '@/components/modules/outageAssignment/GetTechnicianOutageAssignments';

const TechnicianOutageAssignments = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 2,
    };

    const { data } = useSuspenseGetAllOutageAssignments(params);

    const outageAssignments = data?.data?.data ?? [];
    const totalPages = data?.data?.meta?.totalPages ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Outage Assignments</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by title, technician or assigned by..."
                    />
                </div>
            </div>

            {/* Assignment List */}
            <GetTechnicianOutageAssignments data={outageAssignments} />

            {/* Pagination */}
            {totalPages > 0 && (
                <div className="my-5">
                    <TablePagination
                        page={page}
                        totalPages={totalPages}
                        handlePageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
};

export default TechnicianOutageAssignments;
