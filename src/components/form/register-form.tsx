'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import { useRegister } from '@/hooks';
import { registerSchema } from '@/validation';
// import GoogleLoginComponent from '../modules/google-login/GoogleLogin';
import { Button } from '../ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '../ui/field';
import { Input } from '../ui/input';
import { toast } from '../ui/toast';
import { Spinner } from '../ui/spinner';
import GoogleLoginComponent from '../modules/google-login/GoogleLogin';

const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();
    const { mutate: register, isPending: registrationPending } = useRegister();

    type CustomerDefaultValues = z.infer<typeof registerSchema>;

    const defaultValues: CustomerDefaultValues = {
        name: 'Tara Mony 1',
        email: 'mosttaramony1@gmail.com',
        password: '',
        confirmPassword: '',
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: registerSchema,
        },

        onSubmit: ({ value }) => {
            const registerData = {
                name: value.name,
                email: value.email,
                password: value.password,
            };

            register(registerData, {
                onSuccess: async (res) => {
                    if (!res.success) {
                        toast.add({
                            title: 'Server Failure',
                            description: 'Something went wrong. Try again...',
                            type: 'error',
                        });
                    }

                    toast.add({
                        title: 'User Registration Successfully!',
                        description: 'Please Verify Your Account',
                        type: 'success',
                    });

                    const params = new URLSearchParams({
                        email: registerData.email,
                    });

                    router.push(
                        `/register/verify-account?${params.toString()}`,
                    );
                },

                onError: (err) => {
                    toast.add({
                        title: 'Authorization Failure',
                        description:
                            err.message || 'Something went wrong. Try again...',
                        type: 'error',
                    });
                },
            });
        },
    });

    return (
        <div className="flex flex-col gap-5">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Create your account
                </h1>

                <p className="text-balance text-sm text-muted-foreground">
                    Fill in the form below to create your account
                </p>
            </div>

            {/* Register Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
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

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="text"
                                        placeholder="Enter your full name"
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        onBlur={field.handleBlur}
                                        value={field.state.value}
                                        autoComplete="name"
                                        aria-invalid={isInvalid}
                                    />

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
                                        Email
                                    </FieldLabel>

                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="email"
                                        placeholder="Enter your email"
                                        onChange={(e) =>
                                            field.handleChange(e.target.value)
                                        }
                                        onBlur={field.handleBlur}
                                        value={field.state.value}
                                        autoComplete="email"
                                        aria-invalid={isInvalid}
                                    />

                                    {isInvalid && (
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Enter your password"
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={field.handleBlur}
                                            value={field.state.value}
                                            autoComplete="new-password"
                                            aria-invalid={isInvalid}
                                        />

                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeClosed className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
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

                    {/* Confirm Password */}
                    <form.Field name="confirmPassword">
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;

                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Confirm Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            placeholder="Type your confirm password"
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={field.handleBlur}
                                            value={field.state.value}
                                            autoComplete="new-password"
                                            aria-invalid={isInvalid}
                                        />

                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    (prev) => !prev,
                                                )
                                            }
                                            aria-label={
                                                showPassword
                                                    ? 'Hide password'
                                                    : 'Show password'
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeClosed className="size-4" />
                                            ) : (
                                                <Eye className="size-4" />
                                            )}
                                        </button>
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

                    {/* Submit */}
                    <Button
                        disabled={registrationPending}
                        type="submit"
                        className="w-full"
                    >
                        {registrationPending ? (
                            <>
                                <Spinner /> submitting
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>

                    {/* Social Login Separator */}
                    <FieldSeparator>Or continue with</FieldSeparator>

                    {/* Social Login Buttons */}
                    <Field>
                        <div className="flex flex-col gap-2">
                            {/* Google */}
                            <GoogleLoginComponent />
                        </div>

                        {/* Sign In / Login Link */}
                        <FieldDescription className="text-center">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="underline underline-offset-4 text-[#ff8a00] font-semibold"
                            >
                                Sign In
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default RegisterForm;
