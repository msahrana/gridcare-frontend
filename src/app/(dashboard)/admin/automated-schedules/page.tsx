'use client';

import CreateAutomatedSchedule from '@/components/modules/automated-schedule/CreateAutomatedSchedule';
import GetAutomatedSchedule from '@/components/modules/automated-schedule/GetAutomatedSchedule';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import { useSuspenseGetAllAutomatedSchedules } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';
import { useState } from 'react';

const AutomatedSchedules = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 5,
    };

    const { data } = useSuspenseGetAllAutomatedSchedules(params);
    console.log(data);

    const automatedSchedules = data?.data?.data ?? [];

    const totalPages = data?.data?.meta?.totalPages ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Outage Reports:</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by title, area or code..."
                    />
                </div>

                <CreateAutomatedSchedule />
            </div>

            <div>
                <GetAutomatedSchedule data={automatedSchedules} />
            </div>

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

export default AutomatedSchedules;
