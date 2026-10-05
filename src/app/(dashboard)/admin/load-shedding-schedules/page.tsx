'use client';

import { useState } from 'react';

import { useSuspenseGetAllLoadSheddingSchedules } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';

import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';

import CreateLoadSheddingSchedule from '@/components/modules/load-shedding-schedule/CreateLoadSheddingSchedule';
import GetLoadSheddingSchedule from '@/components/modules/load-shedding-schedule/GetLoadSheddingSchedule';

const LoadSheddingSchedules = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 7,
    };

    const { data } = useSuspenseGetAllLoadSheddingSchedules(params);

    console.log(data);

    const loadSheddingSchedules = data?.data?.data ?? [];
    const totalPages = data?.data?.meta?.totalPages ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        All Load Shedding Schedules
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage load shedding schedules.
                    </p>
                </div>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by title or description..."
                    />
                </div>

                <CreateLoadSheddingSchedule />
            </div>

            {/* Schedule List */}
            <GetLoadSheddingSchedule data={loadSheddingSchedules} />

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

export default LoadSheddingSchedules;
