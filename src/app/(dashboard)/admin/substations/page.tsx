'use client';

import { useState } from 'react';

import CreateSubstation from '@/components/modules/substation/CreateSubstation';
import GetAllSubstations from '@/components/modules/substation/GetSubstation';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import { useSuspenseGetAllSubstations } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';

const Substations = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 5,
    };

    const { data } = useSuspenseGetAllSubstations(params);
    console.log(data.data)

    const substations = data?.data ?? [];
    const totalPages = data?.meta?.totalPages ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Substations</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by substation or code..."
                    />
                </div>

                <CreateSubstation />
            </div>

            <GetAllSubstations data={substations} />

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

export default Substations;