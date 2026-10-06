'use client';

import { useState } from 'react';
import { toast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import {
    useCancelAutomatedSchedule,
    usePublishAutomatedSchedule,
} from '@/hooks';

import { IAutomatedSchedule } from '@/interface';

import { CheckCircle, XCircle } from 'lucide-react';

interface GetAutomatedScheduleProps {
    data: IAutomatedSchedule[];
}

const GetAutomatedSchedule = ({ data }: GetAutomatedScheduleProps) => {
    const { mutate: publishSchedule, isPending: isPublishing } =
        usePublishAutomatedSchedule();

    const { mutate: cancelSchedule, isPending: isCancelling } =
        useCancelAutomatedSchedule();

    const [selectedSchedule, setSelectedSchedule] =
        useState<IAutomatedSchedule | null>(null);

    const [publishOpen, setPublishOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);

    const handlePublish = (schedule: IAutomatedSchedule) => {
        setSelectedSchedule(schedule);
        setPublishOpen(true);
    };

    const handleCancel = (schedule: IAutomatedSchedule) => {
        setSelectedSchedule(schedule);
        setCancelOpen(true);
    };

    const handleConfirmPublish = () => {
        if (!selectedSchedule) return;

        publishSchedule(selectedSchedule.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Schedule Published',
                    description:
                        res.message ||
                        'The automated schedule has been published successfully.',
                    type: 'success',
                });

                setPublishOpen(false);
                setSelectedSchedule(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Publish Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to publish the automated schedule.',
                    type: 'error',
                });
            },
        });
    };

    const handleConfirmCancel = () => {
        if (!selectedSchedule) return;

        cancelSchedule(selectedSchedule.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Schedule Cancelled',
                    description:
                        res.message ||
                        'The automated schedule has been cancelled successfully.',
                    type: 'success',
                });

                setCancelOpen(false);
                setSelectedSchedule(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Cancel Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to cancel the automated schedule.',
                    type: 'error',
                });
            },
        });
    };

    const formatDateTime = (value: string) => {
        return new Date(value).toLocaleString();
    };

    return (
        <>
            {/* Automated Schedule Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Start Time</th>
                            <th className="px-4 py-3">End Time</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((schedule) => (
                                <tr key={schedule.id} className="border-b">
                                    {/* Title */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {schedule.title}
                                            </p>

                                            <p className="max-w-xs truncate text-xs text-muted-foreground">
                                                {schedule.description}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Area */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {schedule.area.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {schedule.area.code}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Start Time */}
                                    <td className="px-4 py-3 text-sm">
                                        {formatDateTime(schedule.startTime)}
                                    </td>

                                    {/* End Time */}
                                    <td className="px-4 py-3 text-sm">
                                        {formatDateTime(schedule.endTime)}
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                                schedule.status === 'PUBLISHED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : schedule.status ===
                                                        'COMPLETED'
                                                      ? 'bg-blue-100 text-blue-700'
                                                      : schedule.status ===
                                                          'CANCELLED'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {schedule.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {/* Publish */}
                                            {schedule.status === 'DRAFT' && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        handlePublish(schedule)
                                                    }
                                                    disabled={
                                                        isPublishing ||
                                                        isCancelling
                                                    }
                                                >
                                                    <CheckCircle className="mr-1 size-4" />
                                                    Publish
                                                </Button>
                                            )}

                                            {/* Cancel */}
                                            {schedule.status !== 'COMPLETED' &&
                                                schedule.status !==
                                                    'CANCELLED' && (
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleCancel(
                                                                schedule,
                                                            )
                                                        }
                                                        disabled={
                                                            isPublishing ||
                                                            isCancelling
                                                        }
                                                    >
                                                        <XCircle className="mr-1 size-4" />
                                                        Cancel
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
                                    No automated schedules found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Publish Confirmation Dialog */}
            <Dialog
                open={publishOpen}
                onOpenChange={(open) => {
                    if (isPublishing) return;

                    setPublishOpen(open);

                    if (!open) {
                        setSelectedSchedule(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Publish Automated Schedule</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to publish this automated
                            schedule?
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSchedule && (
                        <div className="space-y-3 rounded-md border bg-muted/50 p-4">
                            <div>
                                <p className="text-sm font-medium">Title</p>
                                <p className="text-sm text-muted-foreground">
                                    {selectedSchedule.title}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium">Area</p>
                                <p className="text-sm text-muted-foreground">
                                    {selectedSchedule.area.name} (
                                    {selectedSchedule.area.code})
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium">Schedule</p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDateTime(selectedSchedule.startTime)}{' '}
                                    - {formatDateTime(selectedSchedule.endTime)}
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isPublishing}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            onClick={handleConfirmPublish}
                            disabled={isPublishing || !selectedSchedule}
                        >
                            {isPublishing
                                ? 'Publishing...'
                                : 'Publish Schedule'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Cancel Confirmation Dialog */}
            <Dialog
                open={cancelOpen}
                onOpenChange={(open) => {
                    if (isCancelling) return;

                    setCancelOpen(open);

                    if (!open) {
                        setSelectedSchedule(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Automated Schedule</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to cancel this automated
                            schedule?
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSchedule && (
                        <div className="rounded-md border bg-muted/50 p-4">
                            <p className="font-medium">
                                {selectedSchedule.title}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {selectedSchedule.area.name} (
                                {selectedSchedule.area.code})
                            </p>

                            <p className="mt-2 text-sm text-muted-foreground">
                                {formatDateTime(selectedSchedule.startTime)} -{' '}
                                {formatDateTime(selectedSchedule.endTime)}
                            </p>
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isCancelling}
                                >
                                    Keep Schedule
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmCancel}
                            disabled={isCancelling || !selectedSchedule}
                        >
                            {isCancelling ? 'Cancelling...' : 'Cancel Schedule'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetAutomatedSchedule;
