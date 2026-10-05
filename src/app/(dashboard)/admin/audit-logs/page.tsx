'use client';

import { useState } from 'react';

import CreateAuditLog from '@/components/modules/audit-log/CreateAuditLog';
import GetAuditLog from '@/components/modules/audit-log/GetAuditLog';
import SearchInput from '@/components/shared/SearchInput';
import TablePagination from '@/components/ui/table-pagination';
import { useSuspenseGetAllAuditLogs } from '@/hooks/audit-log.hook';
import useDebounce from '@/hooks/debounce.hook';

const AuditLogs = () => {
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const params = {
        searchTerm,
        page,
        limit: 7,
    };

    const { data } = useSuspenseGetAllAuditLogs(params);

    const auditLogs = data?.data?.data ?? [];
    const totalPages = data?.data?.meta?.totalPages ?? 1;

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Audit Logs</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by action or entity..."
                    />
                </div>

                <CreateAuditLog />
            </div>

            {/* Audit Logs Table */}
            <div>
                <GetAuditLog data={auditLogs} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
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

export default AuditLogs;
