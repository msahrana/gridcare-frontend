'use client';

import { useState } from 'react';
import { useSuspenseGetAllAreas } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';
import SearchInput from '@/components/shared/SearchInput';
import CreateArea from '@/components/modules/area/CreateArea';
import GetArea from '@/components/modules/area/GetArea';
import TablePagination from '@/components/ui/table-pagination';

const Areas = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 5,
    };

    const { data } = useSuspenseGetAllAreas(params);

    const areas = data?.data ?? [];
    const totalPages = data?.meta?.totalPages ?? 0;

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

                <CreateArea />
            </div>

            <div>
                <GetArea data={areas} />
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

export default Areas;
