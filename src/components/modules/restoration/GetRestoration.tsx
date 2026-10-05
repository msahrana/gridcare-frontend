'use client';

import { useState } from 'react';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

import { toast } from '@/components/ui/toast';

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

import { IRestoration } from '@/interface';

import {
    useCancelRestoration,
    useCompleteRestoration,
    useDeleteRestoration,
} from '@/hooks';

interface GetAllRestorationProps {
    data: IRestoration[];
}

const GetRestoration = ({ data }: GetAllRestorationProps) => {
    const { mutate: completeRestoration, isPending: isCompleting } =
        useCompleteRestoration();

    const { mutate: cancelRestoration, isPending: isCancelling } =
        useCancelRestoration();

    const { mutate: deleteRestoration, isPending: isDeleting } =
        useDeleteRestoration();

    const isProcessing = isCompleting || isCancelling || isDeleting;

    const [selectedRestoration, setSelectedRestoration] =
        useState<IRestoration | null>(null);

    const [remarks, setRemarks] = useState('');

    const [completeOpen, setCompleteOpen] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // =========================
    // Complete
    // =========================

    const handleComplete = (restoration: IRestoration) => {
        setSelectedRestoration(restoration);
        setRemarks(restoration.remarks || '');
        setCompleteOpen(true);
    };

    const handleConfirmComplete = () => {
        if (!selectedRestoration) return;

        completeRestoration(
            {
                id: selectedRestoration.id,
                payload: {
                    completedAt: new Date().toISOString(),
                    remarks: remarks.trim() || undefined,
                },
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Restoration Completed',
                        description:
                            res.message ||
                            'The restoration has been completed successfully.',
                        type: 'success',
                    });

                    setCompleteOpen(false);
                    setSelectedRestoration(null);
                    setRemarks('');
                },

                onError: (error) => {
                    toast.add({
                        title: 'Complete Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to complete the restoration.',
                        type: 'error',
                    });
                },
            },
        );
    };

    // =========================
    // Cancel
    // =========================

    const handleCancel = (restoration: IRestoration) => {
        setSelectedRestoration(restoration);
        setRemarks('');
        setCancelOpen(true);
    };

    const handleConfirmCancel = () => {
        if (!selectedRestoration) return;

        cancelRestoration(
            {
                id: selectedRestoration.id,
                payload: {
                    remarks: remarks.trim() || undefined,
                },
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Restoration Cancelled',
                        description:
                            res.message ||
                            'The restoration has been cancelled successfully.',
                        type: 'success',
                    });

                    setCancelOpen(false);
                    setSelectedRestoration(null);
                    setRemarks('');
                },

                onError: (error) => {
                    toast.add({
                        title: 'Cancel Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to cancel the restoration.',
                        type: 'error',
                    });
                },
            },
        );
    };

    // =========================
    // Delete
    // =========================

    const handleDelete = (restoration: IRestoration) => {
        setSelectedRestoration(restoration);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedRestoration) return;

        deleteRestoration(selectedRestoration.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Restoration Deleted',
                    description:
                        res.message ||
                        'The restoration has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedRestoration(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the restoration.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <>
            {/* =========================
                Restoration Table
            ========================== */}

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Outage</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Technician</th>
                            <th className="px-4 py-3">Started</th>
                            <th className="px-4 py-3">Completed</th>
                            <th className="px-4 py-3">Duration</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Remarks</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((restoration) => {
                                const isInProgress =
                                    restoration.status === 'IN_PROGRESS';

                                const isCompleted =
                                    restoration.status === 'COMPLETED';

                                return (
                                    <tr
                                        key={restoration.id}
                                        className="border-b"
                                    >
                                        {/* Outage */}
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">
                                                    {restoration.outage.title}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {restoration.outage.type}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Area */}
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">
                                                    {
                                                        restoration.outage.area
                                                            .name
                                                    }
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        restoration.outage.area
                                                            .code
                                                    }
                                                </p>
                                            </div>
                                        </td>

                                        {/* Technician */}
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium">
                                                    {
                                                        restoration.technician
                                                            .employeeId
                                                    }
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        restoration.technician
                                                            .phone
                                                    }
                                                </p>
                                            </div>
                                        </td>

                                        {/* Started */}
                                        <td className="px-4 py-3 text-sm">
                                            {new Date(
                                                restoration.startedAt,
                                            ).toLocaleString()}
                                        </td>

                                        {/* Completed */}
                                        <td className="px-4 py-3 text-sm">
                                            {restoration.completedAt
                                                ? new Date(
                                                      restoration.completedAt,
                                                  ).toLocaleString()
                                                : 'Not completed'}
                                        </td>

                                        {/* Duration */}
                                        <td className="px-4 py-3 text-sm">
                                            {restoration.duration !== null
                                                ? `${restoration.duration} min`
                                                : 'N/A'}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                    restoration.status ===
                                                    'COMPLETED'
                                                        ? 'bg-green-100 text-green-700'
                                                        : restoration.status ===
                                                            'CANCELLED'
                                                          ? 'bg-red-100 text-red-700'
                                                          : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {restoration.status}
                                            </span>
                                        </td>

                                        {/* Remarks */}
                                        <td className="max-w-xs px-4 py-3 text-sm">
                                            <p className="line-clamp-2">
                                                {restoration.remarks || 'N/A'}
                                            </p>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                {/* Complete + Cancel */}
                                                {isInProgress && (
                                                    <>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleComplete(
                                                                    restoration,
                                                                )
                                                            }
                                                            disabled={
                                                                isCompleting ||
                                                                isProcessing
                                                            }
                                                            title="Complete restoration"
                                                        >
                                                            <CheckCircle className="size-4" />
                                                        </Button>

                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                handleCancel(
                                                                    restoration,
                                                                )
                                                            }
                                                            disabled={
                                                                isCancelling ||
                                                                isProcessing
                                                            }
                                                            title="Cancel restoration"
                                                        >
                                                            <XCircle className="size-4" />
                                                        </Button>
                                                    </>
                                                )}

                                                {/* Delete */}
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleDelete(
                                                            restoration,
                                                        )
                                                    }
                                                    disabled={
                                                        isCompleted ||
                                                        isDeleting ||
                                                        isCompleting ||
                                                        isCancelling
                                                    }
                                                    title={
                                                        isCompleted
                                                            ? 'Completed restoration cannot be deleted'
                                                            : 'Delete restoration'
                                                    }
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No restorations found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* =========================
                Complete Dialog
            ========================== */}

            <Dialog
                open={completeOpen}
                onOpenChange={(open) => {
                    if (isCompleting) return;

                    setCompleteOpen(open);

                    if (!open) {
                        setSelectedRestoration(null);
                        setRemarks('');
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Complete Restoration</DialogTitle>

                        <DialogDescription>
                            Confirm that this restoration work has been
                            completed.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRestoration && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Outage</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedRestoration.outage.title}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Technician</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedRestoration.technician.employeeId}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="complete-remarks">
                                    Remarks
                                </Label>

                                <Textarea
                                    id="complete-remarks"
                                    value={remarks}
                                    onChange={(event) =>
                                        setRemarks(event.target.value)
                                    }
                                    disabled={isCompleting}
                                    placeholder="Enter completion remarks"
                                    rows={4}
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
                                    disabled={isCompleting}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            onClick={handleConfirmComplete}
                            disabled={isCompleting || !selectedRestoration}
                        >
                            {isCompleting
                                ? 'Completing...'
                                : 'Complete Restoration'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* =========================
                Cancel Dialog
            ========================== */}

            <Dialog
                open={cancelOpen}
                onOpenChange={(open) => {
                    if (isCancelling) return;

                    setCancelOpen(open);

                    if (!open) {
                        setSelectedRestoration(null);
                        setRemarks('');
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cancel Restoration</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to cancel this restoration?
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRestoration && (
                        <div className="space-y-4">
                            <div className="rounded-md border bg-muted/50 p-3">
                                <p className="font-medium">
                                    {selectedRestoration.outage.title}
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    {selectedRestoration.outage.area.name}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cancel-remarks">
                                    Cancellation Reason
                                </Label>

                                <Textarea
                                    id="cancel-remarks"
                                    value={remarks}
                                    onChange={(event) =>
                                        setRemarks(event.target.value)
                                    }
                                    disabled={isCancelling}
                                    placeholder="Enter cancellation reason"
                                    rows={4}
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
                                    disabled={isCancelling}
                                >
                                    Close
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmCancel}
                            disabled={isCancelling || !selectedRestoration}
                        >
                            {isCancelling
                                ? 'Cancelling...'
                                : 'Cancel Restoration'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* =========================
                Delete Dialog
            ========================== */}

            <Dialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    if (isDeleting) return;

                    setDeleteOpen(open);

                    if (!open) {
                        setSelectedRestoration(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Restoration</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete this restoration?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRestoration && (
                        <div className="rounded-md border bg-muted/50 p-3">
                            <p className="font-medium">
                                {selectedRestoration.outage.title}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {selectedRestoration.technician.employeeId}
                            </p>
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isDeleting}
                                >
                                    Close
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={isDeleting || !selectedRestoration}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Restoration'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetRestoration;
