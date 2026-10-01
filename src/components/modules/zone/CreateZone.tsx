'use client';

import { useForm } from '@tanstack/react-form';
import { Loader2, Plus } from 'lucide-react';
import { useState } from 'react';

import { useCreateZone } from '@/hooks';

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
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';

import { type ZoneFormValues, zoneSchema } from '@/validation';

const CreateZone = () => {
    const [open, setOpen] = useState(false);

    const { mutate: createZone, isPending } = useCreateZone();

    const form = useForm({
        defaultValues: {
            name: '',
            code: '',
            description: '',
        } satisfies ZoneFormValues,

        validators: {
            onSubmit: zoneSchema,
        },

        onSubmit: async ({ value }) => {
            createZone(value, {
                onSuccess: (res) => {
                    toast.add({
                        title: 'Zone Created',
                        description:
                            res.message ||
                            'The power distribution zone has been created successfully.',
                        type: 'success',
                    });

                    form.reset();
                    setOpen(false);
                },

                onError: (error) => {
                    toast.add({
                        title: 'Zone Creation Failed',
                        description:
                            error instanceof Error
                                ? error.message
                                : 'Failed to create the power distribution zone.',
                        type: 'error',
                    });
                },
            });
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
                        Create Zone
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>Create Zone</DialogTitle>

                    <DialogDescription>
                        Create a new power distribution zone for GridCare.
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
                        {/* Zone Name */}
                        <form.Field name="name">
                            {(field) => {
                                const hasError =
                                    field.state.meta.isTouched &&
                                    field.state.meta.errors.length > 0;

                                return (
                                    <Field data-invalid={hasError}>
                                        <Label htmlFor={field.name}>
                                            Zone Name
                                        </Label>

                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            placeholder="e.g. Rangpur Zone"
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

                        {/* Zone Code */}
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
                                            placeholder="e.g. RNG"
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
                                            RNG, SYL or COX.
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

                                        <Textarea
                                            id={field.name}
                                            name={field.name}
                                            placeholder="Describe this power distribution zone..."
                                            className="min-h-27.5 resize-none"
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
                    </FieldGroup>

                    <DialogFooter className="mt-6">
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
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-2 size-4" />
                                    Create Zone
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateZone;
