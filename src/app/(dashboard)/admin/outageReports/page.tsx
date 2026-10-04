'use client';

import CreateOutageReport from '@/components/modules/outageReport/CreateOutageReport';
import GetOutageReport from '@/components/modules/outageReport/GetOutageReport';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import useDebounce from '@/hooks/debounce.hook';
import { useSuspenseGetAllOutageReports } from '@/hooks/outageReport.hook';
import { useState } from 'react';

const OutageReports = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 7,
    };

    const { data } = useSuspenseGetAllOutageReports(params);
    console.log(data);

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

                <CreateOutageReport />
            </div>

            <div>
                <GetOutageReport data={outageReports} />
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

export default OutageReports;
