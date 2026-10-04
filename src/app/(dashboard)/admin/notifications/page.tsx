'use client';

import { useState } from 'react';

import CreateNotification from '@/components/modules/notification/CreateNotification';
import GetNotification from '@/components/modules/notification/GetNotification';
import SearchInput from '@/components/shared/SearchInput';
import { Button } from '@/components/ui/button';
import TablePagination from '@/components/ui/table-pagination';

import {
    useSuspenseGetAllNotifications,
    useSuspenseGetAllUsers,
} from '@/hooks';

import useDebounce from '@/hooks/debounce.hook';

const Notifications = () => {
    const [searchInput, setSearchInput] = useState('');

    const [openCreateModal, setOpenCreateModal] = useState(false);

    const [page, setPage] = useState(1);

    const searchTerm = useDebounce(searchInput, 500);

    const { data } = useSuspenseGetAllNotifications({
        searchTerm,
        page,
        limit: 7,
    });

    const { data: usersData } = useSuspenseGetAllUsers();

    const notifications = data?.data?.data ?? [];

    const totalPages = data?.data?.meta?.totalPages ?? 1;

    // Your API returns data: User[]
    const users = usersData?.data ?? [];

    const handleSearch = (value: string) => {
        setSearchInput(value);
        setPage(1);
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Notifications:</h1>

                <div className="ml-auto">
                    <SearchInput
                        value={searchInput}
                        onChange={handleSearch}
                        placeholder="Search by title or message..."
                    />
                </div>

                <Button onClick={() => setOpenCreateModal(true)}>
                    Create Notification
                </Button>

                <CreateNotification
                    open={openCreateModal}
                    onOpenChange={setOpenCreateModal}
                    users={users}
                />
            </div>

            <GetNotification data={notifications} />

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

export default Notifications;
