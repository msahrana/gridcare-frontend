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

import {
    useCreateArea,
    useSuspenseGetAllZones,
    useSuspenseGetAllSubstations,
    useSuspenseGetAllFeeders,
} from '@/hooks';
import { createAreaSchema } from '@/validation';
import { AreaFormValues } from '@/interface';

const CreateArea = () => {
    const [open, setOpen] = useState(false);

    const { mutateAsync: createArea, isPending } = useCreateArea();

    // Get zones
    const { data: zones, isFetching: isZonesFetching } = useSuspenseGetAllZones(
        {
            page: 1,
            limit: 100,
        },
    );

    // Get substations
    const { data: substations, isFetching: isSubstationsFetching } =
        useSuspenseGetAllSubstations({
            page: 1,
            limit: 100,
        });

    // Get feeders
    const { data: feeders, isFetching: isFeedersFetching } =
        useSuspenseGetAllFeeders({
            page: 1,
            limit: 100,
        });

    const activeZones = (zones?.data?.data ?? []).filter(
        (zone) => zone.isActive,
    );

    const activeSubstations = (substations?.data ?? []).filter(
        (substation) => substation.isActive,
    );

    const activeFeeders = (feeders?.data?.data ?? []).filter(
        (feeder) => feeder.status === 'ACTIVE',
    );

    const defaultValues: AreaFormValues = {
        name: '',
        code: '',
        zoneId: '',
        substationId: '',
        feederId: '',
        address: '',
        latitude: 0,
        longitude: 0,
        isActive: true,
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: createAreaSchema,
        },

        onSubmit: async ({ value }) => {
            try {
                const res = await createArea({
                    name: value.name.trim(),
                    code: value.code.trim().toUpperCase(),
                    zoneId: value.zoneId,
                    substationId: value.substationId,
                    feederId: value.feederId,
                    address: value.address.trim(),
                    latitude: Number(value.latitude),
                    longitude: Number(value.longitude),
                    isActive: value.isActive,
                });

                toast.add({
                    title: 'Area Created',
                    description:
                        res.message ||
                        'The area has been created successfully.',
                    type: 'success',
                });

                form.reset();
                setOpen(false);
            } catch (error) {
                toast.add({
                    title: 'Area Creation Failed',
                    description:
                        error instanceof Error
                            ? error.message
                            : 'Failed to create the area.',
                    type: 'error',
                });
            }
        },
    });

    const isRelatedDataFetching =
        isZonesFetching || isSubstationsFetching || isFeedersFetching;

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
                        <Plus className="mr-1 size-2" />
                        Create Area
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create Area</DialogTitle>

                    <DialogDescription>
                        Create a new area for GridCare.
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
                        {/* Area Name */}
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Area Name
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Rangpur Sadar Area"
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

                        {/* Area Code */}
                        <form.Field name="code">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Area Code
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. AREA-RNG-SADAR-001"
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
                                            AREA-RNG-SADAR-001.
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

                                            {activeZones.map((zone) => (
                                                <option
                                                    key={zone.id}
                                                    value={zone.id}
                                                >
                                                    {zone.name} ({zone.code})
                                                </option>
                                            ))}
                                        </select>

                                        {!isZonesFetching &&
                                            activeZones.length === 0 && (
                                                <p className="text-xs text-muted-foreground">
                                                    No active zones available.
                                                    Please create an active zone
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
                                                    available.
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

                        {/* Feeder */}
                        <form.Field name="feederId">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Feeder
                                        </Label>

                                        <select
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            disabled={
                                                isFeedersFetching || isPending
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
                                                {isFeedersFetching
                                                    ? 'Loading feeders...'
                                                    : 'Select a feeder'}
                                            </option>

                                            {activeFeeders.map((feeder) => (
                                                <option
                                                    key={feeder.id}
                                                    value={feeder.id}
                                                >
                                                    {feeder.name} ({feeder.code}
                                                    )
                                                </option>
                                            ))}
                                        </select>

                                        {!isFeedersFetching &&
                                            activeFeeders.length === 0 && (
                                                <p className="text-xs text-muted-foreground">
                                                    No active feeders available.
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

                        {/* Address */}
                        <form.Field name="address">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Address
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Rangpur Sadar, Rangpur"
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {/* Latitude */}
                            <form.Field name="latitude">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <Label htmlFor={field.name}>
                                                Latitude
                                            </Label>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                step="any"
                                                placeholder="e.g. 25.7439"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(
                                                        Number(
                                                            event.target.value,
                                                        ),
                                                    )
                                                }
                                                aria-invalid={hasError}
                                            />

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

                            {/* Longitude */}
                            <form.Field name="longitude">
                                {(field) => {
                                    const hasError =
                                        field.state.meta.isTouched &&
                                        field.state.meta.errors.length > 0;

                                    return (
                                        <Field data-invalid={hasError}>
                                            <Label htmlFor={field.name}>
                                                Longitude
                                            </Label>

                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                step="any"
                                                placeholder="e.g. 89.2752"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(
                                                        Number(
                                                            event.target.value,
                                                        ),
                                                    )
                                                }
                                                aria-invalid={hasError}
                                            />

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
                            <form.Field name="isActive">
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
                                                value={
                                                    field.state.value
                                                        ? 'true'
                                                        : 'false'
                                                }
                                                disabled={isPending}
                                                onBlur={field.handleBlur}
                                                onChange={(event) =>
                                                    field.handleChange(
                                                        event.target.value ===
                                                            'true',
                                                    )
                                                }
                                                aria-invalid={hasError}
                                                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="true">
                                                    Active
                                                </option>

                                                <option value="false">
                                                    Inactive
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
                                isRelatedDataFetching ||
                                activeZones.length === 0 ||
                                activeSubstations.length === 0 ||
                                activeFeeders.length === 0
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
                                    Create Area
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateArea;
