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

import { useCreateSubstation, useSuspenseGetAllZones } from '@/hooks';

import { SubstationFormValues } from '@/interface';

import { createSubstationSchema } from '@/validation';

const CreateSubstation = () => {
    const [open, setOpen] = useState(false);

    const { mutate: createSubstation, isPending } = useCreateSubstation();

    // Get all zones
    const { data: zoneResponse, isFetching: isZonesFetching } =
        useSuspenseGetAllZones({
            page: 1,
            limit: 100,
        });

    const zones = (zoneResponse?.data?.data ?? []).filter(
        (zone) => zone.isActive,
    );

    const form = useForm({
        defaultValues: {
            name: '',
            code: '',
            zoneId: '',
            capacity: '',
        } satisfies SubstationFormValues,

        validators: {
            onSubmit: createSubstationSchema,
        },

        onSubmit: async ({ value }) => {
            createSubstation(
                {
                    name: value.name.trim(),
                    code: value.code.trim().toUpperCase(),
                    zoneId: value.zoneId,
                    capacity: Number(value.capacity),
                },
                {
                    onSuccess: (res) => {
                        toast.add({
                            title: 'Substation Created',
                            description:
                                res.message ||
                                'The substation has been created successfully.',
                            type: 'success',
                        });

                        form.reset();
                        setOpen(false);
                    },

                    onError: (error) => {
                        toast.add({
                            title: 'Substation Creation Failed',
                            description:
                                error instanceof Error
                                    ? error.message
                                    : 'Failed to create the substation.',
                            type: 'error',
                        });
                    },
                },
            );
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
                        Create Substation
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create Substation</DialogTitle>

                    <DialogDescription>
                        Create a new substation for GridCare.
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
                        {/* Substation Name */}
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Substation Name
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Rangpur Central Substation"
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

                        {/* Substation Code */}
                        <form.Field name="code">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>Code</Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. RNG-CSS"
                                            maxLength={10}
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
                                            RNG-CSS, SYL-CSS or COX-CSS.
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

                        {/* Zone */}
                        <form.Field name="zoneId">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>Zone</Label>

                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            disabled={
                                                isZonesFetching || isPending
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
                                                {isZonesFetching
                                                    ? 'Loading zones...'
                                                    : 'Select a zone'}
                                            </option>

                                            {zones.map((zone) => (
                                                <option
                                                    key={zone.id}
                                                    value={zone.id}
                                                >
                                                    {zone.name} ({zone.code})
                                                </option>
                                            ))}
                                        </select>

                                        {!isZonesFetching &&
                                            zones.length === 0 && (
                                                <p className="text-xs text-muted-foreground">
                                                    No zones available. Please
                                                    create a zone first.
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

                        {/* Capacity */}
                        <form.Field name="capacity">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Capacity
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type="number"
                                            min="1"
                                            placeholder="e.g. 48"
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(event) =>
                                                field.handleChange(
                                                    event.target.value,
                                                )
                                            }
                                            aria-invalid={hasError}
                                        />

                                        <p className="text-xs text-muted-foreground">
                                            Enter the substation capacity.
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
                                isZonesFetching ||
                                zones.length === 0
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
                                    Create Substation
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSubstation;
