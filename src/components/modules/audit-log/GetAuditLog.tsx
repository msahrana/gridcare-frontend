'use client';

import { useState } from 'react';
import { Eye, Trash2 } from 'lucide-react';

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

import { useDeleteAuditLog, useGetSingleAuditLog } from '@/hooks';

import { IAuditLog } from '@/interface';

interface GetAuditLogProps {
    data: IAuditLog[];
}

const GetAuditLog = ({ data }: GetAuditLogProps) => {
    const { mutate: deleteAuditLog, isPending: isDeleting } =
        useDeleteAuditLog();

    const [selectedAuditLog, setSelectedAuditLog] = useState<IAuditLog | null>(
        null,
    );

    const [selectedAuditLogId, setSelectedAuditLogId] = useState<string | null>(
        null,
    );

    const [viewOpen, setViewOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    /*
     * Get single audit log
     */
    const {
        data: singleAuditLogResponse,
        isLoading: isLoadingAuditLog,
        isError: isAuditLogError,
    } = useGetSingleAuditLog(selectedAuditLogId ?? '');

    /*
     * View
     */
    const handleView = (auditLog: IAuditLog) => {
        setSelectedAuditLog(auditLog);
        setSelectedAuditLogId(auditLog.id);
        setViewOpen(true);
    };

    /*
     * Delete
     */
    const handleDelete = (auditLog: IAuditLog) => {
        setSelectedAuditLog(auditLog);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!selectedAuditLog) return;

        deleteAuditLog(selectedAuditLog.id, {
            onSuccess: (res) => {
                toast.add({
                    title: 'Audit Log Deleted',
                    description:
                        res.message ||
                        'The audit log has been deleted successfully.',
                    type: 'success',
                });

                setDeleteOpen(false);
                setSelectedAuditLog(null);
            },

            onError: (error) => {
                toast.add({
                    title: 'Delete Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to delete the audit log.',
                    type: 'error',
                });
            },
        });
    };

    /*
     * Format JSON values
     */
    const formatValue = (value: Record<string, unknown> | null) => {
        if (!value) return 'N/A';

        return JSON.stringify(value, null, 2);
    };

    /*
     * Use API response when available.
     * Fallback to selected table row.
     */
    const auditLogDetails = singleAuditLogResponse?.data ?? selectedAuditLog;

    return (
        <>
            {/* ==================== TABLE ==================== */}

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-100 text-left">
                            <th className="px-4 py-3">Action</th>
                            <th className="px-4 py-3">Entity</th>
                            <th className="px-4 py-3">Actor</th>
                            <th className="px-4 py-3">Old Value</th>
                            <th className="px-4 py-3">New Value</th>
                            <th className="px-4 py-3">IP Address</th>
                            <th className="px-4 py-3">Created At</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((auditLog) => (
                                <tr key={auditLog.id} className="border-b">
                                    {/* Action */}
                                    <td className="px-4 py-3">
                                        <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                            {auditLog.action}
                                        </span>
                                    </td>

                                    {/* Entity */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {auditLog.entity}
                                            </p>

                                            <p className="max-w-45 truncate text-xs text-muted-foreground">
                                                {auditLog.entityId}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Actor */}
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium">
                                                {auditLog.actor.name}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {auditLog.actor.email}
                                            </p>

                                            <p className="text-xs text-muted-foreground">
                                                {auditLog.actor.role}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Old Value */}
                                    <td className="px-4 py-3">
                                        <pre className="max-w-50 overflow-x-auto rounded bg-muted p-2 text-xs">
                                            {formatValue(auditLog.oldValue)}
                                        </pre>
                                    </td>

                                    {/* New Value */}
                                    <td className="px-4 py-3">
                                        <pre className="max-w-50 overflow-x-auto rounded bg-muted p-2 text-xs">
                                            {formatValue(auditLog.newValue)}
                                        </pre>
                                    </td>

                                    {/* IP Address */}
                                    <td className="px-4 py-3 text-sm">
                                        {auditLog.ipAddress ?? 'N/A'}
                                    </td>

                                    {/* Created At */}
                                    <td className="px-4 py-3 text-sm">
                                        {new Date(
                                            auditLog.createdAt,
                                        ).toLocaleString()}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {/* View */}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleView(auditLog)
                                                }
                                            >
                                                <Eye className="mr-1 size-4" />
                                                View
                                            </Button>

                                            {/* Delete */}
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(auditLog)
                                                }
                                                disabled={isDeleting}
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
                                    colSpan={8}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No audit logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ==================== VIEW DIALOG ==================== */}

            <Dialog
                open={viewOpen}
                onOpenChange={(open) => {
                    setViewOpen(open);

                    if (!open) {
                        setSelectedAuditLogId(null);
                    }
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Audit Log Details</DialogTitle>

                        <DialogDescription>
                            Detailed information about this audit log.
                        </DialogDescription>
                    </DialogHeader>

                    {isLoadingAuditLog ? (
                        <div className="py-10 text-center text-muted-foreground">
                            Loading audit log...
                        </div>
                    ) : isAuditLogError ? (
                        <div className="py-10 text-center text-red-500">
                            Failed to load audit log details.
                        </div>
                    ) : auditLogDetails ? (
                        <div className="space-y-4">
                            {/* Action */}
                            <div className="rounded-md border p-3">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Action
                                </p>

                                <p className="mt-1 font-semibold">
                                    {auditLogDetails.action}
                                </p>
                            </div>

                            {/* Entity */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-md border p-3">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Entity
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {auditLogDetails.entity}
                                    </p>
                                </div>

                                <div className="rounded-md border p-3">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Entity ID
                                    </p>

                                    <p className="mt-1 break-all text-sm">
                                        {auditLogDetails.entityId}
                                    </p>
                                </div>
                            </div>

                            {/* Actor */}
                            <div className="rounded-md border p-3">
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Actor
                                </p>

                                <div className="space-y-1">
                                    <p>
                                        <span className="font-medium">
                                            Name:
                                        </span>{' '}
                                        {auditLogDetails.actor.name}
                                    </p>

                                    <p>
                                        <span className="font-medium">
                                            Email:
                                        </span>{' '}
                                        {auditLogDetails.actor.email}
                                    </p>

                                    <p>
                                        <span className="font-medium">
                                            Role:
                                        </span>{' '}
                                        {auditLogDetails.actor.role}
                                    </p>
                                </div>
                            </div>

                            {/* Old Value */}
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    Old Value
                                </p>

                                <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
                                    {formatValue(auditLogDetails.oldValue)}
                                </pre>
                            </div>

                            {/* New Value */}
                            <div>
                                <p className="mb-2 text-sm font-medium">
                                    New Value
                                </p>

                                <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
                                    {formatValue(auditLogDetails.newValue)}
                                </pre>
                            </div>

                            {/* IP + Date */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-md border p-3">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        IP Address
                                    </p>

                                    <p className="mt-1">
                                        {auditLogDetails.ipAddress ?? 'N/A'}
                                    </p>
                                </div>

                                <div className="rounded-md border p-3">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Created At
                                    </p>

                                    <p className="mt-1 text-sm">
                                        {new Date(
                                            auditLogDetails.createdAt,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-10 text-center text-muted-foreground">
                            No audit log details found.
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button type="button" variant="outline">
                                    Close
                                </Button>
                            }
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* ==================== DELETE DIALOG ==================== */}

            <Dialog
                open={deleteOpen}
                onOpenChange={(open) => {
                    if (isDeleting) return;

                    setDeleteOpen(open);

                    if (!open) {
                        setSelectedAuditLog(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Audit Log</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to delete this audit log? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedAuditLog && (
                        <div className="space-y-2 rounded-md border bg-muted/50 p-3">
                            <div>
                                <span className="text-sm font-medium">
                                    Action:{' '}
                                </span>

                                <span className="text-sm">
                                    {selectedAuditLog.action}
                                </span>
                            </div>

                            <div>
                                <span className="text-sm font-medium">
                                    Entity:{' '}
                                </span>

                                <span className="text-sm">
                                    {selectedAuditLog.entity}
                                </span>
                            </div>

                            <div>
                                <span className="text-sm font-medium">
                                    Actor:{' '}
                                </span>

                                <span className="text-sm">
                                    {selectedAuditLog.actor.name}
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
                            disabled={isDeleting || !selectedAuditLog}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Audit Log'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default GetAuditLog;
