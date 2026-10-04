'use client';

import { useState } from 'react';

import { useCreateOutageAssignment } from '@/hooks';

import {
    useSuspenseGetAllOutages,
    useSuspenseGetAllTechnicians,
} from '@/hooks';

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
import { toast } from '@/components/ui/toast';

import { Plus } from 'lucide-react';

const CreateOutageAssignments = () => {
    const [open, setOpen] = useState(false);
    const [outageId, setOutageId] = useState('');
    const [technicianId, setTechnicianId] = useState('');

    const { mutate: createOutageAssignment, isPending } =
        useCreateOutageAssignment();

    const { data: outages } = useSuspenseGetAllOutages({
        page: 1,
        limit: 100,
    });

    const { data: technicians } = useSuspenseGetAllTechnicians({
        page: 1,
        limit: 100,
    });

    const outageList = outages?.data?.data ?? [];
    const technicianList = technicians?.data ?? [];

    const availableTechnicians = technicianList.filter(
        (technician) =>
            technician.status === 'AVAILABLE' &&
            technician.verificationStatus === 'APPROVED',
    );

    const handleSubmit = () => {
        if (!outageId || !technicianId) {
            toast.add({
                title: 'Validation Error',
                description: 'Please select an outage and technician.',
                type: 'error',
            });

            return;
        }

        createOutageAssignment(
            {
                outageId,
                technicianId,
            },
            {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Assignment Created',
                        description:
                            res.message ||
                            'Outage assignment created successfully.',
                        type: 'success',
                    });

                    setOutageId('');
                    setTechnicianId('');
                    setOpen(false);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Creation Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create outage assignment.',
                        type: 'error',
                    });
                },
            },
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (isPending) return;

                setOpen(value);

                if (!value) {
                    setOutageId('');
                    setTechnicianId('');
                }
            }}
        >
            <DialogTrigger
                render={
                    <Button>
                        <Plus className="mr-2 size-4" />
                        Assign Technician
                    </Button>
                }
            />

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Outage Assignment</DialogTitle>

                    <DialogDescription>
                        Assign an available technician to an outage.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Outage */}
                    <div className="space-y-2">
                        <Label htmlFor="outageId">Outage</Label>

                        <select
                            id="outageId"
                            value={outageId}
                            disabled={isPending}
                            onChange={(event) =>
                                setOutageId(event.target.value)
                            }
                            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            <option value="">Select outage</option>

                            {outageList.map((outage) => (
                                <option key={outage.id} value={outage.id}>
                                    {outage.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Technician */}
                    <div className="space-y-2">
                        <Label htmlFor="technicianId">Technician</Label>

                        <select
                            id="technicianId"
                            value={technicianId}
                            disabled={isPending}
                            onChange={(event) =>
                                setTechnicianId(event.target.value)
                            }
                            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        >
                            <option value="">Select technician</option>

                            {availableTechnicians.map((technician) => (
                                <option
                                    key={technician.id}
                                    value={technician.id}
                                >
                                    {technician.employeeId}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isPending}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        disabled={isPending || !outageId || !technicianId}
                        onClick={handleSubmit}
                    >
                        {isPending ? 'Creating...' : 'Create Assignment'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateOutageAssignments;
