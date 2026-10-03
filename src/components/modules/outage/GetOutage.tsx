import { useState } from 'react';

import { IOutage } from '@/interface';

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

import { Pencil, Trash2 } from 'lucide-react';

import { useDeleteOutage, useUpdateOutage } from '@/hooks';

interface GetAllOutagesProps {
    data: IOutage[];
}

const GetOutage = ({ data }: GetAllOutagesProps) => {
    const { mutate: updateOutage, isPending: isUpdating } = useUpdateOutage();

    const { mutate: deleteOutage, isPending: isDeleting } = useDeleteOutage();

    const [selectedOutage, setSelectedOutage] = useState<IOutage | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (outage: IOutage) => {
        setSelectedOutage(outage);
        setUpdateOpen(true);
    };

    const handleDelete = (outage: IOutage) => {
        setSelectedOutage(outage);
        setDeleteOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedOutage) return;

        updateOutage(
            {
                id: selectedOutage.id,
                status: selectedOutage.status,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Outage Updated',
                        description:
                            res.message ||
                            'The outage has been updated successfully.',
                        type: 'success',
                    });

                    setUpdateOpen(false);
                    setSelectedOutage(null);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the outage.',
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
                    title: 'Outage Deleted',
                    description:
                        res.message ||
                        'The outage has been deleted successfully.',
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
                            : 'Failed to delete the outage.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <>
            {/* Outage Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Priority</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((outage) => (
                                <tr key={outage.id} className="border-b">
                                    {/* Title */}
                                    <td className="px-4 py-3 font-medium">
                                        {outage.title}
                                    </td>

                                    {/* Area */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {outage.area.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {outage.area.code}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-3">
                                        <span className="text-sm">
                                            {outage.type}
                                        </span>
                                    </td>

                                    {/* Priority */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                outage.priority === 'CRITICAL'
                                                    ? 'bg-red-100 text-red-700'
                                                    : outage.priority === 'HIGH'
                                                      ? 'bg-orange-100 text-orange-700'
                                                      : outage.priority ===
                                                          'MEDIUM'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-green-100 text-green-700'
                                            }`}
                                        >
                                            {outage.priority}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                outage.status === 'RESTORED' ||
                                                outage.status === 'CLOSED'
                                                    ? 'bg-green-100 text-green-700'
                                                    : outage.status ===
                                                        'CANCELLED'
                                                      ? 'bg-red-100 text-red-700'
                                                      : outage.status ===
                                                          'IN_PROGRESS'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : outage.status ===
                                                            'ASSIGNED'
                                                          ? 'bg-purple-100 text-purple-700'
                                                          : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {outage.status}
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
                                                    handleUpdate(outage)
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
                                                    handleDelete(outage)
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
                                    No outages found.
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
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Outage</DialogTitle>

                        <DialogDescription>
                            Update the status of{' '}
                            <strong>{selectedOutage?.title}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOutage && (
                        <div className="space-y-4">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label>Outage Title</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutage.title}
                                </p>
                            </div>

                            {/* Area */}
                            <div className="space-y-2">
                                <Label>Area</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutage.area.name} (
                                    {selectedOutage.area.code})
                                </p>
                            </div>

                            {/* Current Priority */}
                            <div className="space-y-2">
                                <Label>Priority</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutage.priority}
                                </p>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="outage-status">Status</Label>

                                <select
                                    id="outage-status"
                                    value={selectedOutage.status}
                                    onChange={(event) => {
                                        setSelectedOutage({
                                            ...selectedOutage,
                                            status: event.target
                                                .value as IOutage['status'],
                                        });
                                    }}
                                    disabled={isUpdating}
                                    className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="REPORTED">REPORTED</option>

                                    <option value="VERIFIED">VERIFIED</option>

                                    <option value="ASSIGNED">ASSIGNED</option>

                                    <option value="IN_PROGRESS">
                                        IN_PROGRESS
                                    </option>

                                    <option value="RESTORED">RESTORED</option>

                                    <option value="CLOSED">CLOSED</option>

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
                            {isUpdating ? 'Updating...' : 'Update Outage'}
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
                        <DialogTitle>Delete Outage</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedOutage?.title}</strong>? This
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
                            disabled={isDeleting || !selectedOutage}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Outage'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetOutage;
