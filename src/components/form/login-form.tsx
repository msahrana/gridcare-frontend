'use client';

import { useForm } from '@tanstack/react-form';
import { Eye, EyeClosed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import { useLogin } from '@/hooks';
import { loginSchema } from '@/validation';
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
import { Spinner } from '../ui/spinner';
import { toast } from '../ui/toast';
import GoogleLoginComponent from '../modules/google-login/GoogleLogin';

const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const { mutate: login, isPending: loginPending } = useLogin();

    type UserDefaultValues = z.infer<typeof loginSchema>;

    const defaultValues: UserDefaultValues = {
        email: 'msahrana@gmail.com',
        password: 'SAYed#@5288%$@',

        // defaultValues: {
        //     email: 'tara.mony@srhealthcare.com', //admin
        //     password: '$2b$12$TaraMonymost7860',
        // },

        // defaultValues: {
        //     email: 'testertechnician@gmail.com', //technician
        //     password: 'Tester@technician12345',
        // },

        // defaultValues: {
        //     email: 'drsiyana3@gmail.com', //technician
        //     password: '5*MCj*Fgj5',
        // },
    };

    const form = useForm({
        defaultValues,

        validators: {
            onSubmit: loginSchema,
        },

        onSubmit: ({ value }) => {
            const loginData = {
                email: value.email,
                password: value.password,
            };

            login(loginData, {
                onSuccess: (res) => {
                    console.log('LOGIN SUCCESS:', res);
                    toast.add({
                        title: 'Login Successfully!',
                        description: res.message || 'Welcome Back to Homepage',
                        type: 'success',
                    });

                    router.push('/');
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
                    Login to your account
                </h1>

                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>

            {/* Login Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
            >
                <FieldGroup>
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
                                            autoComplete="current-password"
                                            aria-invalid={isInvalid}
                                            className="pr-10"
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

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-red-400 underline underline-offset-4"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit */}
                    <Button
                        disabled={loginPending}
                        type="submit"
                        className="w-full"
                    >
                        {loginPending ? (
                            <>
                                <Spinner />
                                Submitting
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>

                    {/* Social Login Separator */}
                    <FieldSeparator>Or continue with</FieldSeparator>

                    {/* Social Login */}
                    <Field>
                        <div className="flex flex-col gap-2">
                            <GoogleLoginComponent />
                        </div>

                        {/* Sign Up */}
                        <FieldDescription className="text-center">
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/register"
                                className="underline underline-offset-4 text-[#ff8a00] font-semibold"
                            >
                                Sign Up
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default LoginForm;
