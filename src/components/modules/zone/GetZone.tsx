'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { toast } from '@/components/ui/toast';
import {
    useDeleteZone,
    useGetAllZones,
    useUpdateZone,
} from '@/hooks/zone.hook';
import { IZone } from '@/interface';

const GetAllZones = () => {
    const { data, isLoading, isError } = useGetAllZones();

    const { mutate: updateZone, isPending: isUpdating } = useUpdateZone();
    const { mutate: deleteZone, isPending: isDeleting } = useDeleteZone();

    const [selectedZone, setSelectedZone] = useState<IZone | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (zone: IZone) => {
        setSelectedZone(zone);
        setUpdateOpen(true);
    };
    const handleDelete = (zone: IZone) => {
        setSelectedZone(zone);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedZone) return;

        deleteZone(selectedZone.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Zone Deleted',
                    description:
                        res.message ||
                        'The zone has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedZone(null);
            },
            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the zone.',
                    type: 'error',
                });
            },
        });
    };

    const handleConfirmUpdate = () => {
        if (!selectedZone) return;
        updateZone(
            {
                id: selectedZone.id,
                name: selectedZone.name,
                code: selectedZone.code,
                description: selectedZone.description,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Zone Updated',
                        description:
                            res.message ||
                            'The zone has been updated successfully.',
                        type: 'success',
                    });
                    setUpdateOpen(false);
                    setSelectedZone(null);
                },
                onError: (error) => {
                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the zone.',
                        type: 'error',
                    });
                },
            },
        );
    };

    if (isLoading) {
        return <div>Loading zones...</div>;
    }

    if (isError) {
        return <div>Failed to load zones.</div>;
    }

    return (
        <>
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Code</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data?.data?.map((zone) => (
                            <tr key={zone.id} className="border-b">
                                <td className="px-4 py-3 font-medium">
                                    {zone.name}
                                </td>

                                <td className="px-4 py-3">{zone.code}</td>

                                <td className="px-4 py-3">
                                    {zone.description}
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`font-medium ${
                                            zone.isActive
                                                ? 'text-green-600'
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {zone.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleUpdate(zone)}
                                        >
                                            <Pencil className="mr-1 size-4" />
                                            Update
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(zone)}
                                        >
                                            <Trash2 className="mr-1 size-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
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
                            setSelectedZone(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Zone</DialogTitle>

                        <DialogDescription>
                            Update the information for{' '}
                            <strong>{selectedZone?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedZone && (
                        <div className="space-y-4">
                            {' '}
                            <div className="space-y-2">
                                {' '}
                                <Label htmlFor="zone-name">
                                    Zone Name
                                </Label>{' '}
                                <Input
                                    id="zone-name"
                                    value={selectedZone.name}
                                    onChange={(event) =>
                                        setSelectedZone({
                                            ...selectedZone,
                                            name: event.target.value,
                                        })
                                    }
                                    placeholder="Enter zone name"
                                />{' '}
                            </div>{' '}
                            <div className="space-y-2">
                                {' '}
                                <Label htmlFor="zone-code">
                                    Zone Code
                                </Label>{' '}
                                <Input
                                    id="zone-code"
                                    value={selectedZone.code}
                                    onChange={(event) =>
                                        setSelectedZone({
                                            ...selectedZone,
                                            code: event.target.value.toUpperCase(),
                                        })
                                    }
                                    placeholder="Enter zone code"
                                    className="uppercase"
                                />{' '}
                            </div>{' '}
                            <div className="space-y-2">
                                {' '}
                                <Label htmlFor="zone-description">
                                    Description
                                </Label>{' '}
                                <Textarea
                                    id="zone-description"
                                    value={selectedZone.description}
                                    onChange={(event) =>
                                        setSelectedZone({
                                            ...selectedZone,
                                            description: event.target.value,
                                        })
                                    }
                                    placeholder="Enter zone description"
                                    rows={4}
                                />{' '}
                            </div>{' '}
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
                            {isUpdating ? 'Updating...' : 'Update Zone'}
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
                            setSelectedZone(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Zone</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedZone?.name}</strong>? This action
                            cannot be undone.
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
                            {isDeleting ? 'Deleting...' : 'Delete Zone'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetAllZones;
