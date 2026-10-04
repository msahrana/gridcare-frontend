'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

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

import {
    useDeleteOutageReport,
    useUpdateOutageReport,
} from '@/hooks/outageReport.hook';
import { IOutageReport } from '@/interface';

interface GetAllOutageReportsProps {
    data: IOutageReport[];
}

const GetOutageReport = ({ data }: GetAllOutageReportsProps) => {
    const { mutate: updateOutageReport, isPending: isUpdating } =
        useUpdateOutageReport();

    const { mutate: deleteOutageReport, isPending: isDeleting } =
        useDeleteOutageReport();

    const [selectedOutageReport, setSelectedOutageReport] =
        useState<IOutageReport | null>(null);

    const [updateOpen, setUpdateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleUpdate = (outageReport: IOutageReport) => {
        setSelectedOutageReport(outageReport);
        setUpdateOpen(true);
    };

    const handleDelete = (outageReport: IOutageReport) => {
        setSelectedOutageReport(outageReport);
        setDeleteOpen(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedOutageReport) return;

        updateOutageReport(
            {
                id: selectedOutageReport.id,
                description: selectedOutageReport.description,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Outage Report Updated',
                        description:
                            res.message ||
                            'The outage report has been updated successfully.',
                        type: 'success',
                    });

                    setUpdateOpen(false);
                    setSelectedOutageReport(null);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Update Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to update the outage report.',
                        type: 'error',
                    });
                },
            },
        );
    };

    const handleConfirmDelete = () => {
        if (!selectedOutageReport) return;

        deleteOutageReport(selectedOutageReport.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Outage Report Deleted',
                    description:
                        res.message ||
                        'The outage report has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedOutageReport(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the outage report.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <>
            {/* Outage Report Table */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Outage</th>
                            <th className="px-4 py-3">Area</th>
                            <th className="px-4 py-3">Reporter</th>
                            <th className="px-4 py-3">Description</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((outageReport) => (
                                <tr key={outageReport.id} className="border-b">
                                    {/* Outage */}
                                    <td className="px-4 py-3">
                                        {outageReport.outage ? (
                                            <div>
                                                <p className="font-medium">
                                                    {outageReport.outage.title}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {outageReport.outage.status}
                                                </p>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                No outage linked
                                            </span>
                                        )}
                                    </td>

                                    {/* Area */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {outageReport.area.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {outageReport.area.code}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Reporter */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {outageReport.reporter.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {outageReport.reporter.email}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Description */}
                                    <td className="max-w-md px-4 py-3">
                                        <p className="line-clamp-2 text-sm">
                                            {outageReport.description}
                                        </p>
                                    </td>

                                    {/* Location */}
                                    <td className="px-4 py-3">
                                        <div className="text-sm">
                                            <p>
                                                Lat:{' '}
                                                {outageReport.latitude ?? 'N/A'}
                                            </p>

                                            <p>
                                                Lng:{' '}
                                                {outageReport.longitude ??
                                                    'N/A'}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleUpdate(outageReport)
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
                                                    handleDelete(outageReport)
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
                                    No outage reports found.
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
                        setSelectedOutageReport(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Outage Report</DialogTitle>

                        <DialogDescription>
                            Update the description of this outage report.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOutageReport && (
                        <div className="space-y-4">
                            {/* Outage */}
                            <div className="space-y-2">
                                <Label>Outage</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutageReport.outage?.title ??
                                        'No outage linked'}
                                </p>
                            </div>

                            {/* Area */}
                            <div className="space-y-2">
                                <Label>Area</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutageReport.area.name} (
                                    {selectedOutageReport.area.code})
                                </p>
                            </div>

                            {/* Reporter */}
                            <div className="space-y-2">
                                <Label>Reporter</Label>

                                <p className="rounded-md border bg-muted/50 px-3 py-2 text-sm">
                                    {selectedOutageReport.reporter.name} (
                                    {selectedOutageReport.reporter.email})
                                </p>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="outage-report-description">
                                    Description
                                </Label>

                                <Textarea
                                    id="outage-report-description"
                                    value={selectedOutageReport.description}
                                    onChange={(event) => {
                                        setSelectedOutageReport({
                                            ...selectedOutageReport,
                                            description: event.target.value,
                                        });
                                    }}
                                    disabled={isUpdating}
                                    placeholder="Enter outage report description"
                                    rows={5}
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
                            disabled={
                                isUpdating ||
                                !selectedOutageReport ||
                                !selectedOutageReport.description.trim()
                            }
                        >
                            {isUpdating ? 'Updating...' : 'Update Report'}
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
                        setSelectedOutageReport(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Outage Report</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete this outage report?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOutageReport && (
                        <div className="rounded-md border bg-muted/50 p-3">
                            <p className="font-medium">
                                {selectedOutageReport.area.name}
                            </p>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {selectedOutageReport.description}
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
                                    Cancel
                                </Button>
                            }
                        />

                        <Button
                            type="button"
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={isDeleting || !selectedOutageReport}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Report'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetOutageReport;
