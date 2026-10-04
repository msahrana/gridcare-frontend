'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';

import { useCreateLoadSheddingSchedule, useSuspenseGetAllAreas } from '@/hooks';

import { ICreateLoadSheddingSchedule } from '@/interface';

import { Button } from '@/components/ui/button';
import {
    Dialog,
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

const CreateLoadSheddingSchedule = () => {
    const [open, setOpen] = useState(false);

    const { mutate: createSchedule, isPending } =
        useCreateLoadSheddingSchedule();

    const { data: areasResponse } = useSuspenseGetAllAreas({
        page: 1,
        limit: 100,
    });

    const areas = areasResponse?.data ?? [];

    const form = useForm({
        defaultValues: {
            areaId: '',
            title: '',
            description: '',
            startTime: '',
            endTime: '',
        } satisfies ICreateLoadSheddingSchedule,

        onSubmit: ({ value }) => {
            const startDate = new Date(value.startTime);
            const endDate = new Date(value.endTime);

            if (endDate <= startDate) {
                return;
            }

            const payload: ICreateLoadSheddingSchedule = {
                areaId: value.areaId,
                title: value.title.trim(),
                description: value.description.trim(),
                startTime: startDate.toISOString(),
                endTime: endDate.toISOString(),
            };

            createSchedule(payload, {
                onSuccess: () => {
                    form.reset();

                    setOpen(false);
                },
            });
        },
    });

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!isPending) {
                    setOpen(value);
                }
            }}
        >
            <DialogTrigger
                render={<Button type="button">Create Schedule</Button>}
            />

            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Create Load Shedding Schedule</DialogTitle>

                    <DialogDescription>
                        Create a new load shedding schedule for an area.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Area */}
                    <form.Field
                        name="areaId"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? 'Area is required' : undefined,
                        }}
                    >
                        {(field) => {
                            const hasError =
                                field.state.meta.isTouched &&
                                field.state.meta.errors.length > 0;

                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>Area</Label>

                                    <select
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        disabled={isPending}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                                    >
                                        <option value="">Select area</option>

                                        {areas.map((area) => (
                                            <option
                                                key={area.id}
                                                value={area.id}
                                            >
                                                {area.name} ({area.code})
                                            </option>
                                        ))}
                                    </select>

                                    {hasError && (
                                        <p className="text-sm text-red-500">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
                    </form.Field>

                    {/* Title */}
                    <form.Field
                        name="title"
                        validators={{
                            onChange: ({ value }) => {
                                const title = value.trim();

                                if (!title) {
                                    return 'Title is required';
                                }

                                if (title.length < 5) {
                                    return 'Title must be at least 5 characters';
                                }

                                return undefined;
                            },
                        }}
                    >
                        {(field) => {
                            const hasError =
                                field.state.meta.isTouched &&
                                field.state.meta.errors.length > 0;

                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>Title</Label>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        disabled={isPending}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        placeholder="Enter schedule title"
                                    />

                                    {hasError && (
                                        <p className="text-sm text-red-500">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
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
                        {(field) => {
                            const hasError =
                                field.state.meta.isTouched &&
                                field.state.meta.errors.length > 0;

                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        Description
                                    </Label>

                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        disabled={isPending}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                        rows={4}
                                        placeholder="Enter schedule description"
                                    />

                                    {hasError && (
                                        <p className="text-sm text-red-500">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
                    </form.Field>

                    {/* Start Time */}
                    <form.Field
                        name="startTime"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? 'Start time is required' : undefined,
                        }}
                    >
                        {(field) => {
                            const hasError =
                                field.state.meta.isTouched &&
                                field.state.meta.errors.length > 0;

                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>
                                        Start Time
                                    </Label>

                                    <Input
                                        id={field.name}
                                        type="datetime-local"
                                        value={field.state.value}
                                        disabled={isPending}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                    />

                                    {hasError && (
                                        <p className="text-sm text-red-500">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
                    </form.Field>

                    {/* End Time */}
                    <form.Field
                        name="endTime"
                        validators={{
                            onChange: ({ value }) => {
                                if (!value) {
                                    return 'End time is required';
                                }

                                const startTime =
                                    form.getFieldValue('startTime');

                                if (
                                    startTime &&
                                    new Date(value) <= new Date(startTime)
                                ) {
                                    return 'End time must be after start time';
                                }

                                return undefined;
                            },
                        }}
                    >
                        {(field) => {
                            const hasError =
                                field.state.meta.isTouched &&
                                field.state.meta.errors.length > 0;

                            return (
                                <div className="space-y-2">
                                    <Label htmlFor={field.name}>End Time</Label>

                                    <Input
                                        id={field.name}
                                        type="datetime-local"
                                        value={field.state.value}
                                        disabled={isPending}
                                        onBlur={field.handleBlur}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
                                        }
                                    />

                                    {hasError && (
                                        <p className="text-sm text-red-500">
                                            {field.state.meta.errors[0]}
                                        </p>
                                    )}
                                </div>
                            );
                        }}
                    </form.Field>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => {
                                form.reset();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create Schedule'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLoadSheddingSchedule;
