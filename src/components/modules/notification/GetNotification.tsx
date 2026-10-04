'use client';

import { useState } from 'react';
import { CheckCheck, Eye } from 'lucide-react';

import { toast } from '@/components/ui/toast';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { INotification } from '@/interface';
import { useMarkAllNotificationsAsRead, useUpdateNotification } from '@/hooks';

interface GetNotificationProps {
    data: INotification[];
}

const GetNotification = ({ data }: GetNotificationProps) => {
    const { mutate: markAsRead, isPending: isUpdating } =
        useUpdateNotification();

    const { mutate: markAllAsRead, isPending: isMarkingAll } =
        useMarkAllNotificationsAsRead();

    const [selectedNotification, setSelectedNotification] =
        useState<INotification | null>(null);

    const [open, setOpen] = useState(false);

    const handleView = (notification: INotification) => {
        setSelectedNotification(notification);
        setOpen(true);
    };

    const handleMarkAsRead = (notification: INotification) => {
        if (notification.isRead) return;

        markAsRead(notification.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Notification Read',
                    description:
                        res.message || 'Notification has been marked as read.',
                    type: 'success',
                });
            },

            onError: (error) => {
                toast.add({
                    title: 'Update Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to mark notification as read.',
                    type: 'error',
                });
            },
        });
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead(undefined, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Notifications Read',
                    description:
                        res.message ||
                        'All notifications have been marked as read.',
                    type: 'success',
                });
            },

            onError: (error) => {
                toast.add({
                    title: 'Update Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to mark all notifications as read.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <>
            <div className="mb-4 flex justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleMarkAllAsRead}
                    disabled={isMarkingAll}
                >
                    <CheckCheck className="mr-2 size-4" />

                    {isMarkingAll ? 'Marking...' : 'Mark All as Read'}
                </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Message</th>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Created At</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((notification) => (
                                <tr
                                    key={notification.id}
                                    className={`border-b ${
                                        !notification.isRead
                                            ? 'bg-muted/30'
                                            : ''
                                    }`}
                                >
                                    {/* Title */}
                                    <td className="px-4 py-3">
                                        <p
                                            className={`font-medium ${
                                                !notification.isRead
                                                    ? 'font-semibold'
                                                    : ''
                                            }`}
                                        >
                                            {notification.title}
                                        </p>
                                    </td>

                                    {/* Message */}
                                    <td className="max-w-md px-4 py-3">
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {notification.message}
                                        </p>
                                    </td>

                                    {/* User */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {notification.user.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {notification.user.email}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {notification.user.role}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        {notification.isRead ? (
                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                                Read
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                                                Unread
                                            </span>
                                        )}
                                    </td>

                                    {/* Created At */}
                                    <td className="px-4 py-3 text-sm">
                                        {new Date(
                                            notification.createdAt,
                                        ).toLocaleString()}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleView(notification)
                                                }
                                            >
                                                <Eye className="mr-1 size-4" />
                                                View
                                            </Button>

                                            {!notification.isRead && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleMarkAsRead(
                                                            notification,
                                                        )
                                                    }
                                                    disabled={isUpdating}
                                                >
                                                    <CheckCheck className="mr-1 size-4" />
                                                    Mark as Read
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No notifications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Notification Details Dialog */}
            <Dialog
                open={open}
                onOpenChange={(value) => {
                    setOpen(value);

                    if (!value) {
                        setSelectedNotification(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedNotification?.title}</DialogTitle>
                    </DialogHeader>

                    {selectedNotification && (
                        <div className="space-y-4">
                            {/* Message */}
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Message
                                </p>

                                <p className="rounded-md border bg-muted/50 p-3 text-sm">
                                    {selectedNotification.message}
                                </p>
                            </div>

                            {/* User */}
                            <div>
                                <p className="mb-1 text-sm font-medium">User</p>

                                <div className="rounded-md border bg-muted/50 p-3">
                                    <p className="font-medium">
                                        {selectedNotification.user.name}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {selectedNotification.user.email}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Role: {selectedNotification.user.role}
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Status
                                </p>

                                <p className="text-sm">
                                    {selectedNotification.isRead
                                        ? 'Read'
                                        : 'Unread'}
                                </p>
                            </div>

                            {/* Created At */}
                            <div>
                                <p className="mb-1 text-sm font-medium">
                                    Created At
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {new Date(
                                        selectedNotification.createdAt,
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                                setSelectedNotification(null);
                            }}
                        >
                            Close
                        </Button>

                        {selectedNotification &&
                            !selectedNotification.isRead && (
                                <Button
                                    type="button"
                                    onClick={() => {
                                        handleMarkAsRead(selectedNotification);

                                        setOpen(false);
                                        setSelectedNotification(null);
                                    }}
                                    disabled={isUpdating}
                                >
                                    <CheckCheck className="mr-2 size-4" />
                                    Mark as Read
                                </Button>
                            )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetNotification;
