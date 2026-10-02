'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';

import { ISubstation } from '@/interface';
import { useDeleteSubstation, useUpdateSubstation } from '@/hooks';

interface GetSubstationProps {
    data: ISubstation[];
}

const GetSubstation = ({ data }: GetSubstationProps) => {
    const { mutate: updateSubstation, isPending: isUpdating } =
        useUpdateSubstation();

    const { mutate: deleteSubstation, isPending: isDeleting } =
        useDeleteSubstation();

    const [selectedSubstation, setSelectedSubstation] =
        useState<ISubstation | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (substation: ISubstation) => {
        setSelectedSubstation(substation);
        setUpdateOpen(true);
    };

    const handleDelete = (substation: ISubstation) => {
        setSelectedSubstation(substation);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedSubstation) return;

        deleteSubstation(selectedSubstation.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Substation Deleted',
                    description:
                        res.message ||
                        'The substation has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedSubstation(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the substation.',
                    type: 'error',
                });
            },
        });
    };

    const handleConfirmUpdate = () => {
        if (!selectedSubstation) return;

        updateSubstation(
            {
                id: selectedSubstation.id,
                name: selectedSubstation.name,
                code: selectedSubstation.code,
                zoneId: selectedSubstation.zoneId,
                capacity: selectedSubstation.capacity,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Substation Updated',
                        description:
                            res.message ||
                            'The substation has been updated successfully.',
                        type: 'success',
                    });

                    setUpdateOpen(false);
                    setSelectedSubstation(null);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the substation.',
                        type: 'error',
                    });
                },
            },
        );
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Substation Code</th>
                            <th className="px-4 py-3">Zone</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((substation) => (
                                <tr key={substation.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">
                                        {substation.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {substation.code}
                                    </td>

                                    <td className="px-4 py-3">
                                        {substation.zone?.name || 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`font-medium ${
                                                substation.isActive
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }`}
                                        >
                                            {substation.isActive
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(substation)
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
                                                    handleDelete(substation)
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
                                    colSpan={5}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No substations found.
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
                    if (!isUpdating) {
                        setUpdateOpen(open);

                        if (!open) {
                            setSelectedSubstation(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Substation</DialogTitle>

                        <DialogDescription>
                            Update the information for{' '}
                            <strong>{selectedSubstation?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedSubstation && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="substation-name">
                                    Substation Name
                                </Label>

                                <Input
                                    id="substation-name"
                                    value={selectedSubstation.name}
                                    onChange={(event) =>
                                        setSelectedSubstation({
                                            ...selectedSubstation,
                                            name: event.target.value,
                                        })
                                    }
                                    placeholder="Enter substation name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="substation-code">
                                    Substation Code
                                </Label>

                                <Input
                                    id="substation-code"
                                    value={selectedSubstation.code}
                                    onChange={(event) =>
                                        setSelectedSubstation({
                                            ...selectedSubstation,
                                            code: event.target.value.toUpperCase(),
                                        })
                                    }
                                    placeholder="Enter substation code"
                                    className="uppercase"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="substation-zone">Zone ID</Label>

                                <Input
                                    id="substation-zone"
                                    value={selectedSubstation.zoneId}
                                    onChange={(event) =>
                                        setSelectedSubstation({
                                            ...selectedSubstation,
                                            zoneId: event.target.value,
                                        })
                                    }
                                    placeholder="Enter zone ID"
                                />
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
                            disabled={isUpdating}
                        >
                            {isUpdating ? 'Updating...' : 'Update Substation'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    if (!isDeleting) {
                        setDeleteOpen(open);

                        if (!open) {
                            setSelectedSubstation(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Substation</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedSubstation?.name}</strong>? This
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
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Substation'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetSubstation;
