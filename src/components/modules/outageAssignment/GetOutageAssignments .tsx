'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import { IOutageAssignment } from '@/interface';
import { useDeleteOutageAssignment, useUpdateOutageAssignment } from '@/hooks';

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
import { toast } from '@/components/ui/toast';

interface GetOutageAssignmentsProps {
    data: IOutageAssignment[];
}

const GetOutageAssignments = ({ data }: GetOutageAssignmentsProps) => {
    const { mutate: updateOutage, isPending: isUpdating } =
        useUpdateOutageAssignment();

    const { mutate: deleteOutage, isPending: isDeleting } =
        useDeleteOutageAssignment();

    const [selectedOutage, setSelectedOutage] =
        useState<IOutageAssignment | null>(null);

    const [selectedStatus, setSelectedStatus] =
        useState<IOutageAssignment['status']>('ASSIGNED');

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (assignment: IOutageAssignment) => {
        setSelectedOutage(assignment);
        setSelectedStatus(assignment.status);
        setUpdateOpen(true);
    };

    const handleDelete = (assignment: IOutageAssignment) => {
        setSelectedOutage(assignment);
        setDeleteOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedOutage) return;

        console.log('Updating assignment:', {
            id: selectedOutage.id,
            status: selectedStatus,
        });

        updateOutage(
            {
                id: selectedOutage.id,
                status: selectedStatus,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Assignment Updated',
                        description:
                            res.message ||
                            'The outage assignment has been updated successfully.',
                        type: 'success',
                    });

                    setUpdateOpen(false);
                    setSelectedOutage(null);
                    setSelectedStatus('ASSIGNED');
                },

                onError: (error) => {
                    console.error('Update assignment error:', error);

                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the outage assignment.',
                        type: 'error',
                    });
                },
            },
        );
    };

    const handleConfirmDelete = () => {
        if (!selectedOutage) return;

        deleteOutage(selectedOutage.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Assignment Deleted',
                    description:
                        res.message ||
                        'The outage assignment has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedOutage(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the outage assignment.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <>
            {/* Outage Assignment Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Outage Title</th>
                            <th className="px-4 py-3">Technician Id</th>
                            <th className="px-4 py-3">Outage Status</th>
                            <th className="px-4 py-3">Outage Priority</th>
                            <th className="px-4 py-3">Assignment Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((assignment) => (
                                <tr key={assignment.id} className="border-b">
                                    {/* Outage */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {assignment.outage.title}
                                            </p>

                                            <p className="text-xs text-muted-foreground w-auto">
                                                {assignment.outage.description}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Technician */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {
                                                    assignment.technician
                                                        .employeeId
                                                }
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {assignment.technician.phone}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-3">
                                        <span className="text-sm">
                                            {assignment.outage.type}
                                        </span>
                                    </td>

                                    {/* Priority */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                assignment.outage.priority ===
                                                'CRITICAL'
                                                    ? 'bg-red-100 text-red-700'
                                                    : assignment.outage
                                                            .priority === 'HIGH'
                                                      ? 'bg-orange-100 text-orange-700'
                                                      : assignment.outage
                                                              .priority ===
                                                          'MEDIUM'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-green-100 text-green-700'
                                            }`}
                                        >
                                            {assignment.outage.priority}
                                        </span>
                                    </td>

                                    {/* Assignment Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                assignment.status ===
                                                'COMPLETED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : assignment.status ===
                                                        'CANCELLED'
                                                      ? 'bg-red-100 text-red-700'
                                                      : assignment.status ===
                                                          'IN_PROGRESS'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : assignment.status ===
                                                            'ACCEPTED'
                                                          ? 'bg-cyan-100 text-cyan-700'
                                                          : 'bg-purple-100 text-purple-700'
                                            }`}
                                        >
                                            {assignment.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(assignment)
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
                                                    handleDelete(assignment)
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
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No outage assignments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Update Dialog */}
            <Dialog
                open={updateOpen}
                onOpenChange={(open) => {
                    if (isUpdating) return;

                    setUpdateOpen(open);

                    if (!open) {
                        setSelectedOutage(null);
                        setSelectedStatus('ASSIGNED');
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Outage Assignment</DialogTitle>

                        <DialogDescription>
                            Update the assignment status for{' '}
                            <strong>{selectedOutage?.outage.title}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOutage && (
                        <div className="space-y-4">
                            {/* Outage Title */}
                            <div className="space-y-2">
                                <Label>Outage Title</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutage.outage.title}
                                </p>
                            </div>

                            {/* Technician */}
                            <div className="space-y-2">
                                <Label>Technician</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutage.technician.employeeId}
                                </p>
                            </div>

                            {/* Priority */}
                            <div className="space-y-2">
                                <Label>Priority</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutage.outage.priority}
                                </p>
                            </div>

                            {/* Assignment Status */}
                            <div className="space-y-2">
                                <Label htmlFor="assignment-status">
                                    Assignment Status
                                </Label>

                                <select
                                    id="assignment-status"
                                    value={selectedStatus}
                                    onChange={(event) => {
                                        setSelectedStatus(
                                            event.target
                                                .value as IOutageAssignment['status'],
                                        );
                                    }}
                                    disabled={isUpdating}
                                    className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="ASSIGNED">ASSIGNED</option>

                                    <option value="ACCEPTED">ACCEPTED</option>

                                    <option value="IN_PROGRESS">
                                        IN_PROGRESS
                                    </option>

                                    <option value="COMPLETED">COMPLETED</option>

                                    <option value="CANCELLED">CANCELLED</option>
                                </select>
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
                            disabled={isUpdating || !selectedOutage}
                        >
                            {isUpdating ? 'Updating...' : 'Update Assignment'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    if (isDeleting) return;

                    setDeleteOpen(open);

                    if (!open) {
                        setSelectedOutage(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Outage Assignment</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete the assignment for{' '}
                            <strong>{selectedOutage?.outage.title}</strong>?
                            This action cannot be undone.
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
                            disabled={isDeleting || !selectedOutage}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Assignment'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetOutageAssignments;
