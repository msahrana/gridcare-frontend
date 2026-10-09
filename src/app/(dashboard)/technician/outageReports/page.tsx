'use client';

import GetTechnicianOutageReport from '@/components/modules/outageReport/GetTechnicianOutageReport';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import { useSuspenseGetAllOutageReports } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';

import { useState } from 'react';

const TechnicianOutageReports = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 7,
    };

    const { data } = useSuspenseGetAllOutageReports(params);

    const outageReports = data?.data?.data ?? [];

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
            </div>

            <div>
                <GetTechnicianOutageReport data={outageReports} />
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

export default TechnicianOutageReports;
