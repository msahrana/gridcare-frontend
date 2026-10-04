
'use client';

import { useForm } from '@tanstack/react-form';

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

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
    useCreateOutageReport,
} from '@/hooks/outageReport.hook';

import {
    useSuspenseGetAllAreas,
    useSuspenseGetAllOutages,
} from '@/hooks';

import { ICreateOutageReport } from '@/interface/outageReport.interface';

const CreateOutageReport = () => {
    const { mutate: createOutageReport, isPending } =
        useCreateOutageReport();

    const { data: outageData } = useSuspenseGetAllOutages({
        page: 1,
        limit: 10,
    });

    const { data: areaData } = useSuspenseGetAllAreas({
        page: 1,
        limit: 10,
    });

    const outages = outageData?.data?.data ?? [];
    const areas = areaData?.data ?? [];

    const form = useForm({
        defaultValues: {
            outageId: '',
            areaId: '',
            description: '',
            latitude: '',
            longitude: '',
        },

        onSubmit: async ({ value }) => {
            const payload: ICreateOutageReport = {
                outageId: value.outageId,
                areaId: value.areaId,
                description: value.description.trim(),
                latitude: Number(value.latitude),
                longitude: Number(value.longitude),
            };

            createOutageReport(payload, {
                onSuccess: () => {
                    form.reset();
                },
            });
        },
    });

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button type="button">
                        Create Outage Report
                    </Button>
                }
            />

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Create Outage Report
                    </DialogTitle>

                    <DialogDescription>
                        Report a power outage in your area.
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
                    {/* Outage */}
                    <form.Field
                        name="outageId"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'Outage is required'
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    Outage
                                </Label>

                                <select
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isPending}
                                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="">
                                        Select outage
                                    </option>

                                    {outages.map((outage) => (
                                        <option
                                            key={outage.id}
                                            value={outage.id}
                                        >
                                            {outage.title} -{' '}
                                            {outage.status}
                                        </option>
                                    ))}
                                </select>

                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-destructive">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Area */}
                    <form.Field
                        name="areaId"
                        validators={{
                            onChange: ({ value }) =>
                                !value
                                    ? 'Area is required'
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    Area
                                </Label>

                                <select
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(
                                            event.target.value,
                                        )
                                    }
                                    disabled={isPending}
                                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                >
                                    <option value="">
                                        Select area
                                    </option>

                                    {areas.map((area) => (
                                        <option
                                            key={area.id}
                                            value={area.id}
                                        >
                                            {area.name} ({area.code})
                                        </option>
                                    ))}
                                </select>

                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-destructive">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Description */}
                    <form.Field
                        name="description"
                        validators={{
                            onChange: ({ value }) => {
                                const description = value.trim();

                                if (!description) {
                                    return 'Description is required';
                                }

                                if (description.length < 10) {
                                    return 'Description must be at least 10 characters';
                                }

                                if (description.length > 1000) {
                                    return 'Description must not exceed 1000 characters';
                                }

                                return undefined;
                            },
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor={field.name}>
                                    Description
                                </Label>

                                <Textarea
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(event) =>
                                        field.handleChange(
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Describe the outage..."
                                    rows={4}
                                    disabled={isPending}
                                />

                                <div className="flex justify-between">
                                    {field.state.meta.errors.length > 0 ? (
                                        <p className="text-sm text-destructive">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    ) : (
                                        <span />
                                    )}

                                    <span className="text-xs text-muted-foreground">
                                        {field.state.value.length}/1000
                                    </span>
                                </div>
                            </div>
                        )}
                    </form.Field>

                    {/* Location */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Latitude */}
                        <form.Field name="latitude">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        Latitude
                                    </Label>

                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        step="any"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="25.6279"
                                        disabled={isPending}
                                        className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                    />
                                </div>
                            )}
                        </form.Field>

                        {/* Longitude */}
                        <form.Field name="longitude">
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        Longitude
                                    </Label>

                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        step="any"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="88.6332"
                                        disabled={isPending}
                                        className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                                    />
                                </div>
                            )}
                        </form.Field>
                    </div>

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

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? 'Creating...'
                                : 'Create Report'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateOutageReport;
