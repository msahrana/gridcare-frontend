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
import { useDeleteFeeder, useUpdateFeeder } from '@/hooks';
import { IFeeder } from '@/interface';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface GetAllFeedersProps {
    data: IFeeder[];
}
const GetFeeder = ({ data }: GetAllFeedersProps) => {
    const { mutate: updateFeeder, isPending: isUpdating } = useUpdateFeeder();

    const { mutate: deleteFeeder, isPending: isDeleting } = useDeleteFeeder();

    const [selectedFeeder, setSelectedFeeder] = useState<IFeeder | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (feeder: IFeeder) => {
        setSelectedFeeder(feeder);
        setUpdateOpen(true);
    };

    const handleDelete = (feeder: IFeeder) => {
        setSelectedFeeder(feeder);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedFeeder) return;

        deleteFeeder(selectedFeeder.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Feeder Deleted',
                    description:
                        res.message ||
                        'The feeder has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedFeeder(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the feeder.',
                    type: 'error',
                });
            },
        });
    };

    const handleConfirmUpdate = () => {
        if (!selectedFeeder) return;

        updateFeeder(
            {
                id: selectedFeeder.id,
                name: selectedFeeder.name,
                code: selectedFeeder.code,
                substationId: selectedFeeder.substationId,
                status: selectedFeeder.status,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Feeder Updated',
                        description:
                            res.message ||
                            'The feeder has been updated successfully.',
                        type: 'success',
                    });

                    setUpdateOpen(false);
                    setSelectedFeeder(null);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the feeder.',
                        type: 'error',
                    });
                },
            },
        );
    };

    return (
        <>
            {/* Data Fetching */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Substation Code</th>
                            <th className="px-4 py-3">Substation Name</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((feeder) => (
                                <tr key={feeder.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">
                                        {feeder.name}
                                    </td>

                                    <td className="px-4 py-3">{feeder.code}</td>

                                    <td className="px-4 py-3">
                                        {feeder.substation.name || 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                feeder.status === 'ACTIVE'
                                                    ? 'bg-green-100 text-green-700'
                                                    : feeder.status ===
                                                        'MAINTENANCE'
                                                      ? 'bg-yellow-100 text-yellow-700'
                                                      : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {feeder.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(feeder)
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
                                                    handleDelete(feeder)
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
                                    No feeders found.
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
                            setSelectedFeeder(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Feeder</DialogTitle>

                        <DialogDescription>
                            Update the information for{' '}
                            <strong>{selectedFeeder?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedFeeder && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="feeder-name">Feeder Name</Label>

                                <Input
                                    id="feeder-name"
                                    value={selectedFeeder.name}
                                    onChange={(event) =>
                                        setSelectedFeeder({
                                            ...selectedFeeder,
                                            name: event.target.value,
                                        })
                                    }
                                    placeholder="Enter feeder name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="feeder-code">Feeder Code</Label>

                                <Input
                                    id="feeder-code"
                                    value={selectedFeeder.code}
                                    onChange={(event) =>
                                        setSelectedFeeder({
                                            ...selectedFeeder,
                                            code: event.target.value.toUpperCase(),
                                        })
                                    }
                                    placeholder="Enter feeder code"
                                    className="uppercase"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="feeder-substation">
                                    Substation ID
                                </Label>

                                <Input
                                    id="feeder-substation"
                                    value={selectedFeeder.substationId}
                                    onChange={(event) =>
                                        setSelectedFeeder({
                                            ...selectedFeeder,
                                            substationId: event.target.value,
                                        })
                                    }
                                    placeholder="Enter substation ID"
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
                            {isUpdating ? 'Updating...' : 'Update Feeder'}
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
                            setSelectedFeeder(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Feeder</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedFeeder?.name}</strong>? This action
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
                            {isDeleting ? 'Deleting...' : 'Delete Feeder'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetFeeder;
