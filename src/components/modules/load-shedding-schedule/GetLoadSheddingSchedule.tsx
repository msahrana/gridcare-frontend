'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';

import { Pencil, Trash2 } from 'lucide-react';

import {
    useDeleteLoadSheddingSchedule,
    useUpdateLoadSheddingSchedule,
} from '@/hooks';

import { useState } from 'react';
import { ILoadSheddingSchedule } from '@/interface';
import { ScheduleStatus } from '@/types';

interface GetILoadSheddingScheduleProps {
    data: ILoadSheddingSchedule[];
}

const GetLoadSheddingSchedule = ({ data }: GetILoadSheddingScheduleProps) => {
    const { mutate: updateSchedule, isPending: isUpdating } =
        useUpdateLoadSheddingSchedule();

    const { mutate: deleteSchedule, isPending: isDeleting } =
        useDeleteLoadSheddingSchedule();

    const [selectedSchedule, setSelectedSchedule] =
        useState<ILoadSheddingSchedule | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Only editable fields
    const [description, setDescription] = useState('');

    const handleUpdate = (schedule: ILoadSheddingSchedule) => {
        setSelectedSchedule(schedule);

        // Only these two fields are editable
        setDescription(schedule.description);

        setUpdateOpen(true);
    };

    const handleDelete = (schedule: ILoadSheddingSchedule) => {
        setSelectedSchedule(schedule);
        setDeleteOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedSchedule) return;

        const trimmedDescription = description.trim();

        if (!trimmedDescription) {
            toast.add({
                title: 'Description Required',
                description: 'Please enter a description.',
                type: 'error',
            });

            return;
        }

        updateSchedule(
            {
                id: selectedSchedule.id,
                description: trimmedDescription,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Schedule Updated',
                        description:
                            res.message ||
                            'Schedule description updated successfully.',
                        type: 'success',
                    });

                    setUpdateOpen(false);
                    setSelectedSchedule(null);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the schedule.',
                        type: 'error',
                    });
                },
            },
        );
    };
    const handleConfirmDelete = () => {
        if (!selectedSchedule) return;

        deleteSchedule(selectedSchedule.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Schedule Deleted',
                    description:
                        res.message ||
                        'The load shedding schedule has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedSchedule(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the load shedding schedule.',
                    type: 'error',
                });
            },
        });
    };

    const formatDateTime = (date: string) => {
        return new Date(date).toLocaleString();
    };

    const getStatusClass = (status: ScheduleStatus) => {
        switch (status) {
            case 'PUBLISHED':
                return 'bg-blue-100 text-blue-700';

            case 'ACTIVE':
                return 'bg-green-100 text-green-700';

            case 'COMPLETED':
                return 'bg-purple-100 text-purple-700';

            case 'CANCELLED':
                return 'bg-red-100 text-red-700';

            case 'DRAFT':
            default:
                return 'bg-yellow-100 text-yellow-700';
        }
    };

    return (
        <>
            {/* TABLE */}
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
                                    {/* TITLE */}
                                    <td className="px-4 py-3 font-medium">
                                        {schedule.title}

                                        {/* <p className="mt-1 max-w-xs line-clamp-2 text-xs text-muted-foreground">
                                            {schedule.description}
                                        </p> */}
                                        <p className="mt-1 max-w-xs whitespace-normal text-xs text-muted-foreground">
                                            {schedule.description}
                                        </p>
                                    </td>

                                    {/* AREA */}
                                    <td className="px-4 py-3">
                                        <p className="font-medium">
                                            {schedule.area.name}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {schedule.area.code}
                                        </p>
                                    </td>

                                    {/* START TIME */}
                                    <td className="px-4 py-3 text-sm">
                                        {formatDateTime(schedule.startTime)}
                                    </td>

                                    {/* END TIME */}
                                    <td className="px-4 py-3 text-sm">
                                        {formatDateTime(schedule.endTime)}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                                schedule.status,
                                            )}`}
                                        >
                                            {schedule.status}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(schedule)
                                                }
                                                disabled={
                                                    isUpdating || isDeleting
                                                }
                                            >
                                                <Pencil className="mr-1 size-4" />
                                                Update
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(schedule)
                                                }
                                                disabled={
                                                    isUpdating || isDeleting
                                                }
                                            >
                                                <Trash2 className="mr-1 size-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No load shedding schedules found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* UPDATE DIALOG */}
            <Dialog
                open={updateOpen}
                onOpenChange={(open) => {
                    if (isUpdating) return;

                    setUpdateOpen(open);

                    if (!open) {
                        setSelectedSchedule(null);
                    }
                }}
            >
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Update Load Shedding Schedule</DialogTitle>

                        <DialogDescription>
                            You can update only the description and schedule
                            fee.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSchedule && (
                        <div className="space-y-4">
                            {/* TITLE - READ ONLY */}
                            <div className="space-y-2">
                                <Label>Schedule Title</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedSchedule.title}
                                </p>
                            </div>

                            {/* AREA - READ ONLY */}
                            <div className="space-y-2">
                                <Label>Area</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedSchedule.area.name} (
                                    {selectedSchedule.area.code})
                                </p>
                            </div>

                            {/* DESCRIPTION - EDITABLE */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>

                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                    disabled={isUpdating}
                                    rows={4}
                                    placeholder="Enter schedule description"
                                />
                            </div>

                            {/* START TIME - READ ONLY */}
                            <div className="space-y-2">
                                <Label>Start Time</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {formatDateTime(selectedSchedule.startTime)}
                                </p>
                            </div>

                            {/* END TIME - READ ONLY */}
                            <div className="space-y-2">
                                <Label>End Time</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {formatDateTime(selectedSchedule.endTime)}
                                </p>
                            </div>

                            {/* STATUS - READ ONLY */}
                            <div className="space-y-2">
                                <Label>Status</Label>

                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                                        selectedSchedule.status,
                                    )}`}
                                >
                                    {selectedSchedule.status}
                                </span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isUpdating}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            onClick={handleConfirmUpdate}
                            disabled={isUpdating || !selectedSchedule}
                        >
                            {isUpdating ? 'Updating...' : 'Update Schedule'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* DELETE DIALOG */}
            <Dialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    if (isDeleting) return;

                    setDeleteOpen(open);

                    if (!open) {
                        setSelectedSchedule(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Load Shedding Schedule</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedSchedule?.title}</strong>? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isDeleting}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={isDeleting || !selectedSchedule}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Schedule'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetLoadSheddingSchedule;
