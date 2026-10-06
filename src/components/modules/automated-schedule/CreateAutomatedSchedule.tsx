'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { toast } from '@/components/ui/toast';

import {
    useCreateAutomatedSchedule,
    useSuspenseGetAllAreas,
} from '@/hooks';

import { ICreateAutomatedSchedule } from '@/interface';

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

const CreateAutomatedSchedule = () => {
    const [open, setOpen] = useState(false);

    const { mutate: createSchedule, isPending } =
        useCreateAutomatedSchedule();

    const { data: areaResponse } = useSuspenseGetAllAreas({
        page: 1,
        limit: 100,
    });

    const areas = areaResponse?.data ?? [];

    const form = useForm({
        defaultValues: {
            areaIds: [] as string[],
            date: '',
            startTime: '',
            endTime: '',
            title: '',
            description: '',
        },

        onSubmit: async ({ value }) => {
            const payload: ICreateAutomatedSchedule = {
                areaIds: value.areaIds,
                date: value.date,
                startTime: value.startTime,
                endTime: value.endTime,
                title: value.title.trim(),
                description: value.description.trim(),
            };

            createSchedule(payload, {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Schedule Created',
                        description:
                            res.message ||
                            'Automated schedule created successfully.',
                        type: 'success',
                    });

                    form.reset();
                    setOpen(false);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Create Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create automated schedule.',
                        type: 'error',
                    });
                },
            });
        },
    });

    const handleClose = () => {
        if (isPending) return;

        form.reset();
        setOpen(false);
    };

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
            {/* CREATE BUTTON */}
            <DialogTrigger
                render={
                    <Button type="button">
                        Create Schedule
                    </Button>
                }
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Create Automated Schedule
                    </DialogTitle>

                    <DialogDescription>
                        Create a load shedding schedule for one or more
                        areas.
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
                    {/* AREAS */}
                    <form.Field
                        name="areaIds"
                        validators={{
                            onChange: ({ value }) =>
                                value.length === 0
                                    ? 'Select at least one area'
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label>
                                    Areas{' '}
                                    <span className="text-red-500">*</span>
                                </Label>

                                <div className="max-h-48 overflow-y-auto rounded-md border p-2">
                                    {areas.length > 0 ? (
                                        areas.map((area) => (
                                            <label
                                                key={area.id}
                                                className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={field.state.value.includes(
                                                        area.id,
                                                    )}
                                                    onChange={(event) => {
                                                        if (
                                                            event.target
                                                                .checked
                                                        ) {
                                                            field.handleChange([
                                                                ...field.state
                                                                    .value,
                                                                area.id,
                                                            ]);
                                                        } else {
                                                            field.handleChange(
                                                                field.state.value.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        area.id,
                                                                ),
                                                            );
                                                        }
                                                    }}
                                                />

                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {area.name}
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        {area.code}
                                                    </p>
                                                </div>
                                            </label>
                                        ))
                                    ) : (
                                        <p className="py-4 text-center text-sm text-muted-foreground">
                                            No areas found.
                                        </p>
                                    )}
                                </div>

                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-sm text-red-500">
                                        {field.state.meta.errors[0]}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* DATE */}
                    <form.Field
                        name="date"
                        validators={{
                            onChange: ({ value }) =>
                                !value ? 'Date is required' : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="schedule-date">
                                    Date{' '}
                                    <span className="text-red-500">*</span>
                                </Label>

                                <Input
                                    id="schedule-date"
                                    type="date"
                                    value={field.state.value}
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

                    {/* TIME */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <form.Field
                            name="startTime"
                            validators={{
                                onChange: ({ value }) =>
                                    !value
                                        ? 'Start time is required'
                                        : undefined,
                            }}
                        >
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor="start-time">
                                        Start Time{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>

                                    <Input
                                        id="start-time"
                                        type="time"
                                        value={field.state.value}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
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

                        <form.Field
                            name="endTime"
                            validators={{
                                onChange: ({ value }) =>
                                    !value
                                        ? 'End time is required'
                                        : undefined,
                            }}
                        >
                            {(field) => (
                                <div className="space-y-2">
                                    <Label htmlFor="end-time">
                                        End Time{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>

                                    <Input
                                        id="end-time"
                                        type="time"
                                        value={field.state.value}
                                        onChange={(event) =>
                                            field.handleChange(
                                                event.target.value,
                                            )
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
                    </div>

                    {/* TITLE */}
                    <form.Field
                        name="title"
                        validators={{
                            onChange: ({ value }) =>
                                !value.trim()
                                    ? 'Title is required'
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="schedule-title">
                                    Title{' '}
                                    <span className="text-red-500">*</span>
                                </Label>

                                <Input
                                    id="schedule-title"
                                    placeholder="Evening Load Shedding"
                                    value={field.state.value}
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

                    {/* DESCRIPTION */}
                    <form.Field
                        name="description"
                        validators={{
                            onChange: ({ value }) =>
                                !value.trim()
                                    ? 'Description is required'
                                    : undefined,
                        }}
                    >
                        {(field) => (
                            <div className="space-y-2">
                                <Label htmlFor="schedule-description">
                                    Description{' '}
                                    <span className="text-red-500">*</span>
                                </Label>

                                <Textarea
                                    id="schedule-description"
                                    rows={4}
                                    placeholder="Describe the load shedding schedule..."
                                    value={field.state.value}
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

                    {/* FOOTER */}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending
                                ? 'Creating...'
                                : 'Create Schedule'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateAutomatedSchedule;