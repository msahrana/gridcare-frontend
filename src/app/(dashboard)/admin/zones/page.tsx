'use client';

import { useState } from 'react';

import CreateZone from '@/components/modules/zone/CreateZone';
import GetAllZones from '@/components/modules/zone/GetZone';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import { useSuspenseGetAllZones } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';

const Zones = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 5,
    };

    const { data } = useSuspenseGetAllZones(params);

    const zones = data?.data?.data ?? [];
    const totalPages = data?.data?.meta?.totalPages ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Zones:</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by zone or code..."
                    />
                </div>

                <CreateZone />
            </div>

            <div>
                <GetAllZones data={zones} />
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

export default Zones;
