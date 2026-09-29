'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useDebounce from '@/hooks/debounce.hook';
import { TechnicianParams, TechnicianVerificationStatus } from '@/interface';
import { ChangeEvent, Suspense, useState } from 'react';
import TechnicianApprovalTableLoading from './technician-approval-table-loading';
import TechnicianApprovalTable from './technician-approval-table';
import TechnicianReviewSheet from './technician-review-sheet';

const verificationStatus: ['ALL' | TechnicianVerificationStatus, string][] = [
    ['APPROVED', 'Approved'],
    ['PENDING', 'Pending'],
    ['REJECTED', 'Rejected'],
    ['ALL', 'All'],
];

const TechnicianApprovalTabs = () => {
    const [tab, setTab] = useState<'ALL' | TechnicianVerificationStatus>('ALL');
    const [selectedId, setSelectedId] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(searchInput);

    const handleSearch = (
        e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ) => {
        setSearchInput(e.target.value);
        setPage(1);
    };

    const queryParams: TechnicianParams = {
        page,
        limit: 1,
        ...(tab === 'ALL' ? {} : { verificationStatus: tab }),
        ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    };

    return (
        <>
            <div className="flex justify-between my-5">
                <div>
                    <Input
                        onChange={(e) => handleSearch(e)}
                        type="search"
                        placeholder="Search by name or email"
                    />
                </div>

                <Tabs value={tab} onValueChange={(value) => setTab(value)}>
                    <TabsList>
                        {verificationStatus.map(([value, label]) => (
                            <TabsTrigger key={value} value={value}>
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            <Suspense fallback={<TechnicianApprovalTableLoading />}>
                <TechnicianApprovalTable
                    {...queryParams}
                    handleReview={setSelectedId}
                    handlePageChange={setPage}
                />
            </Suspense>

            <TechnicianReviewSheet
                selectedId={selectedId}
                onClose={() => setSelectedId('')}
                {...queryParams}
            />
        </>
    );
};

export default TechnicianApprovalTabs;
