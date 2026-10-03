'use client';

import { useState } from 'react';

import { useSuspenseGetAllOutages } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';

import SearchInput from '@/components/shared/SearchInput';
import CreateOutage from '@/components/modules/outage/CreateOutage';
import GetOutage from '@/components/modules/outage/GetOutage';
import TablePagination from '@/components/ui/table-pagination';

const Outages = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const search = useDebounce(searchInput, 500);

    const params = {
        search,
        page,
        limit: 5,
    };

    const { data } = useSuspenseGetAllOutages(params);

    const outages = data?.data?.data ?? [];

    const totalPages = data?.data?.meta?.totalPage ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Outages:</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by title, area or code..."
                    />
                </div>

                <CreateOutage />
            </div>

            <div>
                <GetOutage data={outages} />
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

export default Outages;
