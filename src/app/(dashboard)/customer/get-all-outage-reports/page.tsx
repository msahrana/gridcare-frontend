'use client';

import { useState } from 'react';

import GetCustometOutageReport from '@/components/modules/customerOutageReport/GetCustometOutageReport';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';

import { useGetAllOutageReports } from '@/hooks';
import useDebounce from '@/hooks/debounce.hook';

const GetAllOutageReports = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 7,
    };

    const { data, isLoading } = useGetAllOutageReports(params);

    const outageReports = data?.data?.data ?? [];
    const totalPages = data?.data?.meta?.totalPages ?? 0;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Outage Reports
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        আপনার এলাকার বিদ্যুৎ বিভ্রাটের রিপোর্টগুলো দেখুন।
                    </p>
                </div>

                <div className="w-full sm:w-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search outage reports..."
                    />
                </div>
            </div>

            {/* Reports */}
            <section>
                <GetCustometOutageReport data={outageReports} />
            </section>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="flex justify-center pt-2">
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

export default GetAllOutageReports;
