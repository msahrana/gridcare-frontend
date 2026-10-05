'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { toast } from '@/components/ui/toast';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
    useStartRestoration,
    useSuspenseGetAllOutages,
    useSuspenseGetAllTechnicians,
} from '@/hooks';

const CreateRestoration = () => {
    const [open, setOpen] = useState(false);

    const [outageId, setOutageId] = useState('');
    const [technicianId, setTechnicianId] = useState('');
    const [remarks, setRemarks] = useState('');

    const { mutate: startRestoration, isPending } = useStartRestoration();

    const { data: outageResponse } = useSuspenseGetAllOutages({
        page: 1,
        limit: 10,
    });

    const { data: technicianResponse } = useSuspenseGetAllTechnicians({
        page: 1,
        limit: 10,
    });

    const technicians = technicianResponse?.data ?? [];

    const outages = outageResponse?.data?.data ?? [];

    const handleSubmit = () => {
        if (!outageId) {
            toast.add({
                title: 'Validation Error',
                description: 'Please select an outage.',
                type: 'error',
            });

            return;
        }

        if (!technicianId) {
            toast.add({
                title: 'Validation Error',
                description: 'Please select a technician.',
                type: 'error',
            });

            return;
        }

        startRestoration(
            {
                outageId,
                technicianId,
                remarks: remarks.trim() || undefined,
            },
            {
                onSuccess: (response) => {
                    toast.add({
                        title: 'Restoration Started',
                        description:
                            response.message ||
                            'Restoration started successfully.',
                        type: 'success',
                    });

                    setOpen(false);

                    setOutageId('');
                    setTechnicianId('');
                    setRemarks('');
                },

                onError: (error) => {
                    toast.add({
                        title: 'Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to start restoration.',
                        type: 'error',
                    });
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button>
                        <Plus className="mr-2 size-4" />
                        Start Restoration
                    </Button>
                }
            />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Start Restoration</DialogTitle>

                    <DialogDescription>
                        Select an outage and technician to start the restoration
                        process.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* =========================
                        Outage
                    ========================== */}

                    <div className="space-y-2">
                        <Label htmlFor="outageId">Outage</Label>

                        <select
                            id="outageId"
                            value={outageId}
                            onChange={(event) =>
                                setOutageId(event.target.value)
                            }
                            disabled={isPending}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Select outage</option>

                            {/* Outage data এখানে map করবেন */}

                            {outages.map((outage) => (
                                <option key={outage.id} value={outage.id}>
                                    {outage.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* =========================
                        Technician
                    ========================== */}

                    <div className="space-y-2">
                        <Label htmlFor="technicianId">Technician</Label>

                        <select
                            id="technicianId"
                            value={technicianId}
                            onChange={(event) =>
                                setTechnicianId(event.target.value)
                            }
                            disabled={isPending}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        >
                            <option value="">Select technician</option>

                            {/* Technician data এখানে map করবেন */}

                            {technicians.map((technician) => (
                                <option
                                    key={technician.id}
                                    value={technician.id}
                                >
                                    {technician.employeeId}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* =========================
                        Remarks
                    ========================== */}

                    <div className="space-y-2">
                        <Label htmlFor="remarks">Remarks</Label>

                        <Textarea
                            id="remarks"
                            value={remarks}
                            onChange={(event) => setRemarks(event.target.value)}
                            placeholder="Enter restoration remarks"
                            rows={4}
                            disabled={isPending}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isPending || !outageId || !technicianId}
                    >
                        {isPending ? 'Starting...' : 'Start Restoration'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateRestoration;
