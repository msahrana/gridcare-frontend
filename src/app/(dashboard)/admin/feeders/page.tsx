'use client';

import { useState } from 'react';
import useDebounce from '@/hooks/debounce.hook';
import { useSuspenseGetAllFeeders } from '@/hooks/feeder.hook';
import GetFeeder from '@/components/modules/feeder/GetFeeder';
import SearchInput from '@/components/shared/SearchInput';
import CreateFeeder from '@/components/modules/feeder/CreateFeeder';
import TablePagination from '@/components/ui/table-pagination';

const Feeders = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 5,
    };

    const { data } = useSuspenseGetAllFeeders(params);
    console.log(data);

    const feeders = data?.data?.data ?? [];
    const totalPages = data?.data?.meta?.totalPages ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Feeders:</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by substation or code..."
                    />
                </div>

                <CreateFeeder />
            </div>

            <div>
                <GetFeeder data={feeders} />
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

export default Feeders;
