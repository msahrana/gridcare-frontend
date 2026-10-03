import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { useDeleteArea, useUpdateArea } from '@/hooks';
import { IArea } from '@/interface';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface GetAllAreasProps {
    data: IArea[];
}

const GetArea = ({ data }: GetAllAreasProps) => {
    const { mutate: updateArea, isPending: isUpdating } = useUpdateArea();

    const { mutate: deleteArea, isPending: isDeleting } = useDeleteArea();

    const [selectedArea, setSelectedArea] = useState<IArea | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (area: IArea) => {
        setSelectedArea(area);
        setUpdateOpen(true);
    };

    const handleDelete = (area: IArea) => {
        setSelectedArea(area);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedArea) return;

        deleteArea(selectedArea.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Feeder Deleted',
                    description:
                        res.message ||
                        'The feeder has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedArea(null);
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
        if (!selectedArea) return;

        updateArea(
            {
                id: selectedArea.id,
                name: selectedArea.name,
                code: selectedArea.code,
                zoneId: selectedArea.zoneId,
                substationId: selectedArea.substationId,
                feederId: selectedArea.feederId,
                address: selectedArea.address,
                latitude: selectedArea.latitude,
                longitude: selectedArea.longitude,
                isActive: selectedArea.isActive,
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
                    setSelectedArea(null);
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
                            <th className="px-4 py-3">Area Name</th>
                            <th className="px-4 py-3">Area Code</th>
                            <th className="px-4 py-3">Substation Name</th>
                            <th className="px-4 py-3">Zone Name</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((area) => (
                                <tr key={area.id} className="border-b">
                                    <td className="px-4 py-3 font-medium">
                                        {area.name}
                                    </td>

                                    <td className="px-4 py-3">{area.code}</td>

                                    <td className="px-4 py-3">
                                        {area.substation.name || 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        {area.zone.name || 'N/A'}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                area.isActive
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {area.isActive
                                                ? 'ACTIVE'
                                                : 'INACTIVE'}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(area)
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
                                                    handleDelete(area)
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
                            setSelectedArea(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Feeder</DialogTitle>

                        <DialogDescription>
                            Update the information for{' '}
                            <strong>{selectedArea?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedArea && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="area-name">Feeder Name</Label>

                                <Input
                                    id="area-name"
                                    value={selectedArea.name}
                                    onChange={(event) =>
                                        setSelectedArea({
                                            ...selectedArea,
                                            name: event.target.value,
                                        })
                                    }
                                    placeholder="Enter area name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="feeder-code">Area Code</Label>

                                <Input
                                    id="area-code"
                                    value={selectedArea.code}
                                    onChange={(event) =>
                                        setSelectedArea({
                                            ...selectedArea,
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
                                    id="area-substation"
                                    value={selectedArea.substationId}
                                    onChange={(event) =>
                                        setSelectedArea({
                                            ...selectedArea,
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
                            {isUpdating ? 'Updating...' : 'Update Area'}
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
                            setSelectedArea(null);
                        }
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Area</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete{' '}
                            <strong>{selectedArea?.name}</strong>? This action
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
                            {isDeleting ? 'Deleting...' : 'Delete Area'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetArea;
