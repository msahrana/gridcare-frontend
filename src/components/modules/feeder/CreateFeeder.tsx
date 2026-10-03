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

import { useCreateFeeder, useSuspenseGetAllSubstations } from '@/hooks';

import { FeederFormValues } from '@/interface';

import { createFeederSchema } from '@/validation';
import { FeederStatus } from '@/types';

const CreateFeeder = () => {
    const [open, setOpen] = useState(false);

    const { mutateAsync: createFeeder, isPending } = useCreateFeeder();

    // Get substations
    const { data: substations, isFetching: isSubstationsFetching } =
        useSuspenseGetAllSubstations({
            page: 1,
            limit: 10,
        });

    // Only active substations can have feeders
    const activeSubstations = (substations?.data ?? []).filter(
        (substation) => substation.isActive,
    );

    const defaultValues: FeederFormValues = {
        name: '',
        code: '',
        substationId: '',
        status: 'ACTIVE',
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: createFeederSchema,
        },

        onSubmit: async ({ value }) => {
            try {
                const res = await createFeeder({
                    name: value.name.trim(),
                    code: value.code.trim().toUpperCase(),
                    substationId: value.substationId,
                    status: value.status,
                });

                toast.add({
                    title: 'Feeder Created',
                    description:
                        res.message ||
                        'The feeder has been created successfully.',
                    type: 'success',
                });

                form.reset();
                setOpen(false);
            } catch (error) {
                toast.add({
                    title: 'Feeder Creation Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to create the feeder.',
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
                        <Plus className="mr-2 size-4" />
                        Create Feeder
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create Feeder</DialogTitle>

                    <DialogDescription>
                        Create a new feeder for GridCare.
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
                        {/* Feeder Name */}
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Feeder Name
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Rangpur Central Feeder 01"
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

                        {/* Feeder Code */}
                        <form.Field name="code">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Feeder Code
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. RNG-CSS-F01"
                                            maxLength={50}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value.toUpperCase(),
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        <p className="text-xs text-muted-foreground">
                                            Use a unique uppercase code such as
                                            RNG-CSS-F01.
                                        </p>

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

                        {/* Substation */}
                        <form.Field name="substationId">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Substation
                                        </Label>

                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            disabled={
                                                isSubstationsFetching ||
                                                isPending
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
                                                {isSubstationsFetching
                                                    ? 'Loading substations...'
                                                    : 'Select a substation'}
                                            </option>

                                            {activeSubstations.map(
                                                (substation) => (
                                                    <option
                                                        key={substation.id}
                                                        value={substation.id}
                                                    >
                                                        {substation.name} (
                                                        {substation.code})
                                                    </option>
                                                ),
                                            )}
                                        </select>

                                        {!isSubstationsFetching &&
                                            activeSubstations.length === 0 && (
                                                <p className="text-xs text-muted-foreground">
                                                    No active substations
                                                    available. Please create an
                                                    active substation first.
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
                                                        .value as FeederStatus,
                                                )
                                            }
                                            aria-invalid={hasError}
                                            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="ACTIVE">
                                                Active
                                            </option>

                                            <option value="INACTIVE">
                                                Inactive
                                            </option>

                                            <option value="MAINTENANCE">
                                                Maintenance
                                            </option>
                                        </select>

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
                                isSubstationsFetching ||
                                activeSubstations.length === 0
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
                                    Create Feeder
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFeeder;
