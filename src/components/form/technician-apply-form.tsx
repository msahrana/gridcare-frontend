'use client';

import { useForm } from '@tanstack/react-form';
import {
    BriefcaseMedical,
    FileText,
    FileUp,
    Mail,
    MapPin,
    Phone,
    Plus,
    User,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
    technicianApplicationSchema,
    isAcceptedFileSize,
    isAcceptedFileType,
    MAX_ADDITIONAL_FILES,
    MAX_FILE_SIZE,
} from '@/validation';
import { toast } from '../ui/toast';
import { TechnicianApplicationData } from '@/interface';
import { formatFileSize } from '@/utils';
import z from 'zod';
import { useApplyAsTechnician } from '@/hooks';
import { Spinner } from '../ui/spinner';

const TechnicianApplyForm = () => {
    const router = useRouter();
    const { mutate: apply, isPending: applicationPending } =
        useApplyAsTechnician();

    const resumeInputRef = useRef<HTMLInputElement>(null);
    const additionalFileInputRef = useRef<HTMLInputElement>(null);

    type TechnicianFormValues = Omit<
        z.infer<typeof technicianApplicationSchema>,
        'resume'
    > & {
        resume: File | null;
    };

    const defaultValues: TechnicianFormValues = {
        name: 'Mr Technician',
        email: 'technician@gmail.com',
        password: 'PAssWord5288$@@',
        phone: '01912345678',
        address: 'RTC, Rangpur',
        employeeId: 'TECH001',
        skills: 'Electrical maintenance, installation, troubleshooting',
        experienceYears: '3',
        bio: 'Diploma in Electrical Engineering with skills in electrical maintenance, installation, and troubleshooting.',
        resume: null,
        additionalFiles: [],
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: technicianApplicationSchema,
        },

        onSubmit: async ({ value }) => {
            if (!(value.resume instanceof File)) {
                toast.add({
                    title: 'Resume Required',
                    description: 'Please upload your resume or CV.',
                    type: 'error',
                });
                return;
            }

            const technicianData: TechnicianApplicationData = {
                user: {
                    name: value.name.trim(),
                    email: value.email.trim(),
                },

                technician: {
                    phone: value.phone.trim(),
                    employeeId: value.employeeId.trim(),
                    skills: value.skills?.trim() || undefined,
                    experienceYears: Number(value.experienceYears),
                    bio: value.bio?.trim() || undefined,
                },
            };

            apply(
                {
                    data: technicianData,
                    resume: value.resume as File,
                    additionalFiles: value.additionalFiles,
                },
                {
                    onSuccess: (res) => {
                        if (!res.success) {
                            toast.add({
                                title: 'Server Failure',
                                description:
                                    'Something went wrong. Please try again',
                                type: 'error',
                            });
                            return;
                        }

                        toast.add({
                            title: 'Application Submitted',
                            description: 'Please verify your account',
                            type: 'success',
                        });

                        const params = new URLSearchParams({
                            email: technicianData.user.email,
                        });

                        router.push(
                            `/applyAsTechnician/verify-account?${params.toString()}`,
                        );
                    },

                    onError: (err) => {
                        toast.add({
                            title: 'Application failure',
                            description:
                                err.message ||
                                'Something went wrong. Please try again',
                            type: 'error',
                        });
                    },
                },
            );
        },
    });

    return (
        <div className="flex flex-col gap-6 ">
            {/* Header */}
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Apply to join Gridcare
                </h1>
            </div>

            {/* Register Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                noValidate
            >
                <FieldGroup>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {/* Name */}
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Full Name
                                        </FieldLabel>
                                        <div className="relative">
                                            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder=" Mr. Rana"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="name"
                                            />
                                        </div>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Email */}
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Email Address
                                        </FieldLabel>
                                        <div className="relative">
                                            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="email"
                                                placeholder="technician@example.com"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="email"
                                            />
                                        </div>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Phone */}
                        <form.Field name="phone">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Contact Number
                                        </FieldLabel>
                                        <div className="relative">
                                            <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="tel"
                                                placeholder="+880 1712 345678"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="tel"
                                            />
                                        </div>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Address */}
                        <form.Field name="address">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Practice Address
                                            <span className="font-normal text-muted-foreground">
                                                (optional)
                                            </span>
                                        </FieldLabel>
                                        <div className="relative">
                                            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="text"
                                                placeholder="Chamber or hospital address"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                                autoComplete="street-address"
                                            />
                                        </div>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Experience */}
                        <form.Field name="experienceYears">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Years of Experience
                                        </FieldLabel>
                                        <div className="relative">
                                            <BriefcaseMedical className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type="number"
                                                min={0}
                                                max={70}
                                                inputMode="numeric"
                                                placeholder="10"
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value,
                                                    )
                                                }
                                                aria-invalid={isInvalid}
                                                className="pl-9"
                                            />
                                        </div>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </div>

                    {/* Bio */}
                    <form.Field name="bio">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Professional Bio
                                        <span className="font-normal text-muted-foreground">
                                            (optional)
                                        </span>
                                    </FieldLabel>
                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        rows={4}
                                        placeholder="Share your background, areas of interest and patient care philosophy..."
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        aria-invalid={isInvalid}
                                    />
                                    <div className="flex items-center justify-between gap-2">
                                        <FieldDescription>
                                            Shown on your public profile after
                                            approval.
                                        </FieldDescription>
                                        <span className="text-xs text-muted-foreground">
                                            {field.state.value.length}/1000
                                        </span>
                                    </div>
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Resume */}
                    <form.Field name="resume">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            const file = field.state.value;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="resume-field">
                                        Resume
                                    </FieldLabel>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="bg-blue-200 "
                                            onClick={() =>
                                                resumeInputRef.current?.click()
                                            }
                                        >
                                            <FileUp size={16} />
                                            Upload resume
                                        </Button>

                                        <input
                                            ref={resumeInputRef}
                                            id="resume-field"
                                            type="file"
                                            className="sr-only"
                                            name={field.name}
                                            accept=".pdf,.doc,.docx,image/*"
                                            onChange={(e) => {
                                                const selected =
                                                    e.target.files?.[0] ?? null;

                                                if (
                                                    selected &&
                                                    (!isAcceptedFileSize(
                                                        selected.size,
                                                    ) ||
                                                        !isAcceptedFileType(
                                                            selected.type,
                                                        ))
                                                ) {
                                                    field.handleBlur();
                                                    return;
                                                }

                                                field.handleChange(selected);
                                                e.target.value = '';
                                            }}
                                        />

                                        {file ? (
                                            <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                                                <FileText className="size-4 shrink-0 text-primary" />

                                                <span className="truncate">
                                                    {file.name}
                                                </span>

                                                <span className="text-xs text-muted-foreground">
                                                    {formatFileSize(file.size)}
                                                </span>

                                                <button
                                                    type="button"
                                                    aria-label="Remove resume"
                                                    onClick={() => {
                                                        field.handleChange(
                                                            null,
                                                        );
                                                        field.handleBlur();
                                                    }}
                                                    className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                                                >
                                                    <X className="size-4" />
                                                </button>
                                            </span>
                                        ) : (
                                            <span className="text-xs text-muted-foreground">
                                                PDF, DOC, DOCX or image up to{' '}
                                                {MAX_FILE_SIZE} MB
                                            </span>
                                        )}
                                    </div>

                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* AdditionalFiles */}
                    <form.Field name="additionalFiles">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                            const files = field.state.value;
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor="additional-file-field">
                                        Additional Files
                                        <span className="font-normal text-muted-foreground">
                                            (optional)
                                        </span>
                                    </FieldLabel>

                                    <div className="flex flex-wrap items-center gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="bg-blue-200 "
                                            onClick={() =>
                                                additionalFileInputRef.current?.click()
                                            }
                                        >
                                            <Plus size={16} />
                                            Add Files
                                        </Button>

                                        <input
                                            ref={additionalFileInputRef}
                                            id="additional-file-field"
                                            type="file"
                                            multiple
                                            className="sr-only"
                                            name={field.name}
                                            accept=".pdf,.doc,.docx,image/*"
                                            onChange={(e) => {
                                                const incoming = Array.from(
                                                    e.target.files ?? [],
                                                );

                                                if (incoming.length === 0) {
                                                    return;
                                                }

                                                const invalid = incoming.some(
                                                    (file) =>
                                                        !isAcceptedFileSize(
                                                            file.size,
                                                        ) ||
                                                        !isAcceptedFileType(
                                                            file.type,
                                                        ),
                                                );

                                                if (invalid) {
                                                    field.handleBlur();
                                                    e.target.value = '';
                                                    return;
                                                }

                                                const updatedFiles = [
                                                    ...files,
                                                    ...incoming,
                                                ].slice(
                                                    0,
                                                    MAX_ADDITIONAL_FILES,
                                                );

                                                field.handleChange(
                                                    updatedFiles,
                                                );
                                                e.target.value = '';
                                            }}
                                        />

                                        {files.length > 0 && (
                                            <span className="text-xs text-muted-foreground">
                                                {files.length} of{' '}
                                                {MAX_ADDITIONAL_FILES} added
                                            </span>
                                        )}
                                    </div>

                                    {files.length > 0 && (
                                        <ul className="flex flex-col gap-2">
                                            {files.map((file, index) => (
                                                <li
                                                    key={`${file.name}-${index}`}
                                                    className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
                                                >
                                                    <span className="flex min-w-0 items-center gap-2">
                                                        <FileText className="size-4 shrink-0 text-primary" />
                                                        <span className="truncate">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatFileSize(
                                                                file.size,
                                                            )}
                                                        </span>
                                                    </span>
                                                    <button
                                                        type="button"
                                                        aria-label={`Remove ${file.name}`}
                                                        onClick={() => {
                                                            field.handleChange(
                                                                files.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index,
                                                                ),
                                                            );
                                                            field.handleBlur();
                                                        }}
                                                        className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                                                    >
                                                        <X className="size-4" />
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>
                </FieldGroup>

                {/* Submit */}
                <Button
                    disabled={applicationPending}
                    type="submit"
                    className="w-full"
                >
                    {applicationPending ? (
                        <>
                            <Spinner /> submitting
                        </>
                    ) : (
                        'Submit'
                    )}
                </Button>
            </form>

            {/* Sign In / Login Link */}
            <p className="text-xs leading-relaxed text-muted-foreground">
                Already an approved technician?{' '}
                <Link
                    href="/login"
                    className="font-medium underline underline-offset-4 text-[#0055B8] hover:text-primary"
                >
                    Sign in to the Technician Portal
                </Link>
                . Customewr applications should use the{' '}
                <Link
                    href="/register"
                    className="font-medium underline underline-offset-4 text-[#0055B8] hover:text-primary"
                >
                    customer registration
                </Link>{' '}
                form instead.
            </p>
        </div>
    );
};

export default TechnicianApplyForm;
