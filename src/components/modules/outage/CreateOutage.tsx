'use client';

import { useState } from 'react';

import { useForm } from '@tanstack/react-form';
import { Loader2, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { toast } from '@/components/ui/toast';

import { useCreateOutage, useSuspenseGetAllAreas } from '@/hooks';
import { OutageFormValues } from '@/interface';
import { createOutageSchema } from '@/validation';

const CreateOutage = () => {
    const [open, setOpen] = useState(false);

    const { mutateAsync: createOutage, isPending } = useCreateOutage();

    // Get areas
    const { data: areas, isFetching: isAreasFetching } = useSuspenseGetAllAreas(
        {
            page: 1,
            limit: 100,
        },
    );

    const activeAreas = (areas?.data ?? []).filter((area) => area.isActive);

    const defaultValues: OutageFormValues = {
        areaId: '',
        title: '',
        description: '',
        type: 'UNEXPECTED',
        priority: 'MEDIUM',
        status: 'REPORTED',
        startedAt: '',
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: createOutageSchema,
        },

        onSubmit: async ({ value }) => {
            try {
                const res = await createOutage({
                    areaId: value.areaId,
                    title: value.title.trim(),
                    description: value.description.trim(),
                    type: value.type,
                    priority: value.priority,
                    status: value.status,
                    startedAt: value.startedAt,
                });

                toast.add({
                    title: 'Outage Created',
                    description:
                        res.message ||
                        'The outage has been created successfully.',
                    type: 'success',
                });

                form.reset();
                setOpen(false);
            } catch (error) {
                toast.add({
                    title: 'Outage Creation Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to create the outage.',
                    type: 'error',
                });
            }
        },
    });

    const handleOpenChange = (value: boolean) => {
        if (isPending) {
            return;
        }

        setOpen(value);

        if (!value) {
            form.reset();
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button>
                        <Plus className="mr-1 size-4" />
                        Create Outage
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create Outage</DialogTitle>

                    <DialogDescription>
                        Create a new power outage for GridCare.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        void form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        {/* Area */}
                        <form.Field name="areaId">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>Area</Label>

                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            disabled={
                                                isAreasFetching || isPending
                                            }
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={hasError}
                                            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="">
                                                {isAreasFetching
                                                    ? 'Loading areas...'
                                                    : 'Select an area'}
                                            </option>

                                            {activeAreas.map((area) => (
                                                <option
                                                    key={area.id}
                                                    value={area.id}
                                                >
                                                    {area.name} ({area.code})
                                                </option>
                                            ))}
                                        </select>

                                        {!isAreasFetching &&
                                            activeAreas.length === 0 && (
                                                <p className="text-xs text-muted-foreground">
                                                    No active areas available.
                                                    Please create an active area
                                                    first.
                                                </p>
                                            )}

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Title */}
                        <form.Field name="title">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Outage Title
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Major Feeder Trip in Rangpur Sadar"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Description */}
                        <form.Field name="description">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Description
                                        </Label>

                                        <textarea
                                            id={field.name}
                                            name={field.name}
                                            placeholder="Describe the outage..."
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={hasError}
                                            rows={4}
                                            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex min-h-20 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Type / Priority / Status */}
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                            {/* Type */}
                            <form.Field name="type">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <Label htmlFor={field.name}>
                                                Type
                                            </Label>

                                            <select
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                disabled={isPending}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(
                                                        event.target
                                                            .value as OutageFormValues['type'],
                                                    )
                                                }
                                                aria-invalid={hasError}
                                                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="UNEXPECTED">
                                                    Unexpected
                                                </option>

                                                <option value="PLANNED">
                                                    Planned
                                                </option>
                                            </select>

                                            {hasError && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        field.state.meta
                                                            .errors[0]?.message
                                                    }
                                                </p>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Priority */}
                            <form.Field name="priority">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <Label htmlFor={field.name}>
                                                Priority
                                            </Label>

                                            <select
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                disabled={isPending}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(
                                                        event.target
                                                            .value as OutageFormValues['priority'],
                                                    )
                                                }
                                                aria-invalid={hasError}
                                                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="LOW">Low</option>

                                                <option value="MEDIUM">
                                                    Medium
                                                </option>

                                                <option value="HIGH">
                                                    High
                                                </option>

                                                <option value="CRITICAL">
                                                    Critical
                                                </option>
                                            </select>

                                            {hasError && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        field.state.meta
                                                            .errors[0]?.message
                                                    }
                                                </p>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {/* Status */}
                            <form.Field name="status">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <Label htmlFor={field.name}>
                                                Status
                                            </Label>

                                            <select
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                disabled={isPending}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(
                                                        event.target
                                                            .value as OutageFormValues['status'],
                                                    )
                                                }
                                                aria-invalid={hasError}
                                                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="REPORTED">
                                                    Reported
                                                </option>

                                                <option value="VERIFIED">
                                                    Verified
                                                </option>

                                                <option value="ASSIGNED">
                                                    Assigned
                                                </option>

                                                <option value="IN_PROGRESS">
                                                    In Progress
                                                </option>

                                                <option value="RESTORED">
                                                    Restored
                                                </option>

                                                <option value="CLOSED">
                                                    Closed
                                                </option>

                                                <option value="CANCELLED">
                                                    Cancelled
                                                </option>
                                            </select>

                                            {hasError && (
                                                <p className="text-sm text-destructive">
                                                    {
                                                        field.state.meta
                                                            .errors[0]?.message
                                                    }
                                                </p>
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>
                        </div>

                        {/* Started At */}
                        <form.Field name="startedAt">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Started At
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="datetime-local"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            disabled={isPending}
                                            aria-invalid={hasError}
                                        />

                                        {hasError && (
                                            <p className="text-sm text-destructive">
                                                {
                                                    field.state.meta.errors[0]
                                                        ?.message
                                                }
                                            </p>
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </FieldGroup>

                    <DialogFooter className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={
                                isPending ||
                                isAreasFetching ||
                                activeAreas.length === 0
                            }
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 size-4" />
                                    Create Outage
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateOutage;
