'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { toast } from '@/components/ui/toast';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    useCreateAuditLog,
    useSuspenseGetAllLoadSheddingSchedules,
    useSuspenseGetAllOutages,
    useSuspenseGetAllTechnicians,
    useSuspenseGetAllUsers,
} from '@/hooks';

import { ICreateAuditLog } from '@/interface';

const CreateAuditLog = () => {
    const [open, setOpen] = useState(false);

    const { mutate: createAuditLog, isPending } = useCreateAuditLog();

    /*
     * Fetch available entities
     *
     * These use your existing GridCare hooks.
     */
    const { data: outageResponse } = useSuspenseGetAllOutages({
        page: 1,
        limit: 100,
    });

    const { data: userResponse } = useSuspenseGetAllUsers();

    const { data: technicianResponse } = useSuspenseGetAllTechnicians({
        page: 1,
        limit: 100,
    });

    const { data: loadSheddingResponse } =
        useSuspenseGetAllLoadSheddingSchedules({
            page: 1,
            limit: 100,
        });

    /*
     * Extract data
     *
     * Your APIs use:
     *
     * data: {
     *     data: [],
     *     meta: {}
     * }
     */
    const outages = outageResponse?.data?.data ?? [];
    const users = userResponse?.data ?? [];
    const technicians = technicianResponse?.data ?? [];
    const loadSheddingSchedules = loadSheddingResponse?.data?.data ?? [];

    /*
     * Entity options
     */
    const entityOptions = [
        {
            value: 'OUTAGE',
            label: 'Outage',
        },
        {
            value: 'USER',
            label: 'User',
        },
        {
            value: 'TECHNICIAN',
            label: 'Technician',
        },
        {
            value: 'LOAD_SHEDDING_SCHEDULE',
            label: 'Load Shedding Schedule',
        },
    ];

    const form = useForm({
        defaultValues: {
            action: '',
            entity: '',
            entityId: '',
            oldValue: '',
            newValue: '',
        },

        onSubmit: async ({ value }) => {
            let oldValue: Record<string, unknown> | null = null;
            let newValue: Record<string, unknown> | null = null;

            /*
             * Parse oldValue
             */
            try {
                if (value.oldValue.trim()) {
                    oldValue = JSON.parse(value.oldValue);

                    if (
                        typeof oldValue !== 'object' ||
                        Array.isArray(oldValue) ||
                        oldValue === null
                    ) {
                        throw new Error('Invalid object');
                    }
                }
            } catch {
                toast.add({
                    title: 'Invalid Old Value',
                    description: 'Old Value must be a valid JSON object.',
                    type: 'error',
                });

                return;
            }

            /*
             * Parse newValue
             */
            try {
                if (value.newValue.trim()) {
                    newValue = JSON.parse(value.newValue);

                    if (
                        typeof newValue !== 'object' ||
                        Array.isArray(newValue) ||
                        newValue === null
                    ) {
                        throw new Error('Invalid object');
                    }
                }
            } catch {
                toast.add({
                    title: 'Invalid New Value',
                    description: 'New Value must be a valid JSON object.',
                    type: 'error',
                });

                return;
            }

            const payload: ICreateAuditLog = {
                action: value.action.trim(),
                entity: value.entity,
                entityId: value.entityId,
                oldValue,
                newValue,
            };

            createAuditLog(payload, {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Audit Log Created',
                        description:
                            res.message || 'Audit log created successfully.',
                        type: 'success',
                    });

                    form.reset();
                    setOpen(false);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Creation Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create audit log.',
                        type: 'error',
                    });
                },
            });
        },
    });

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (isPending) return;

                setOpen(value);

                if (!value) {
                    form.reset();
                }
            }}
        >
            <DialogTrigger
                render={<Button type="button">Create Audit Log</Button>}
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create Audit Log</DialogTitle>

                    <DialogDescription>
                        Create a new audit log by selecting the entity and
                        entity record.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-5"
                >
                    {/* ================= ACTION ================= */}

                    <form.Field
                        name="action"
                        validators={{
                            onChange: ({ value }) =>
                                !value.trim()
                                    ? 'Action is required'
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Action</Label>

                                <Input
                                    id={field.name}
                                    name={field.name}
                                    placeholder="STATUS_UPDATE"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(event.target.value)
                                    }
                                />

                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* ================= ENTITY ================= */}

                    <form.Field
                        name="entity"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? 'Entity is required' : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label>Entity</Label>

                                <Select
                                    value={field.state.value}
                                    onValueChange={(value) => {
                                        field.handleChange(value ?? '');

                                        /*
                                         * Reset Entity ID when
                                         * Entity changes.
                                         */
                                        form.setFieldValue('entityId', '');
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select entity" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {entityOptions.map((entity) => (
                                            <SelectItem
                                                key={entity.value}
                                                value={entity.value}
                                            >
                                                {entity.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* ================ ENTITY ID ================= */}

                    <form.Field
                        name="entityId"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? 'Entity ID is required' : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label>Entity ID</Label>

                                <Select
                                    value={field.state.value}
                                    onValueChange={(value) =>
                                        field.handleChange(value ?? '')
                                    }
                                    disabled={!form.state.values.entity}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={
                                                !form.state.values.entity
                                                    ? 'Select entity first'
                                                    : 'Select entity record'
                                            }
                                        />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {/* ================= OUTAGE ================= */}

                                        {form.state.values.entity ===
                                            'OUTAGE' &&
                                            outages.map((outage) => (
                                                <SelectItem
                                                    key={outage.id}
                                                    value={outage.id}
                                                >
                                                    {outage.id}
                                                </SelectItem>
                                            ))}

                                        {/* ================= USER ================= */}

                                        {form.state.values.entity === 'USER' &&
                                            users.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.name} ({user.email})
                                                </SelectItem>
                                            ))}

                                        {/* ================ TECHNICIAN ================ */}

                                        {form.state.values.entity ===
                                            'TECHNICIAN' &&
                                            technicians.map((technician) => (
                                                <SelectItem
                                                    key={technician.id}
                                                    value={technician.id}
                                                >
                                                    {technician.user?.name ??
                                                        technician.user
                                                            ?.email ??
                                                        technician.id}
                                                </SelectItem>
                                            ))}

                                        {/* ========== LOAD SHEDDING SCHEDULE ========== */}

                                        {form.state.values.entity ===
                                            'LOAD_SHEDDING_SCHEDULE' &&
                                            loadSheddingSchedules.map(
                                                (schedule) => (
                                                    <SelectItem
                                                        key={schedule.id}
                                                        value={schedule.id}
                                                    >
                                                        {schedule.id}
                                                    </SelectItem>
                                                ),
                                            )}
                                    </SelectContent>
                                </Select>

                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* ================= OLD VALUE ================= */}

                    <form.Field name="oldValue">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>Old Value</Label>

                                <Textarea
                                    id={field.name}
                                    name={field.name}
                                    rows={5}
                                    placeholder={`{"status": "REPORTED"}`}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(event.target.value)
                                    }
                                />

                                <p className="text-xs text-muted-foreground">
                                    Enter a valid JSON object. Leave empty if
                                    there is no old value.
                                </p>
                            </div>
                        )}
                    </form.Field>

                    {/* ================= NEW VALUE ================= */}

                    <form.Field name="newValue">
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>New Value</Label>

                                <Textarea
                                    id={field.name}
                                    name={field.name}
                                    rows={5}
                                    placeholder={`{"status": "VERIFIED"}`}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(event.target.value)
                                    }
                                />

                                <p className="text-xs text-muted-foreground">
                                    Enter a valid JSON object. Leave empty if
                                    there is no new value.
                                </p>
                            </div>
                        )}
                    </form.Field>

                    {/* ================= FOOTER ================= */}

                    <DialogFooter>
                        <DialogClose
                            render={
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={isPending}
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create Audit Log'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAuditLog;
