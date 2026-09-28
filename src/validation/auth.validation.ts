import z from 'zod';

export const registerSchema = z
    .object({
        name: z
            .string()
            .min(2, 'Name must be at least 2 characters long.')
            .max(50, 'Name must not exceed 50 characters.'),

        email: z.email('Please enter a valid email address.'),

        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long.')
            .regex(
                /[a-z]/,
                'Password must contain at least 1 lowercase letter.',
            )
            .regex(
                /[A-Z]/,
                'Password must contain at least 1 uppercase letter.',
            )
            .regex(/[0-9]/, 'Password must contain at least 1 number.')
            .regex(
                /[^A-Za-z0-9]/,
                'Password must contain at least 1 special character.',
            ),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

export const loginSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, 'Password Must Minimum 8 Characters Long.')
        .regex(/[a-z]/, 'Password must contain at least 1 Lowercase Letter')
        .regex(/[A-Z]/, 'Password must contain at least 1 Uppercase Letter')
        .regex(/[0-9]/, 'Password must contain at least 1 Number')
        .regex(
            /[^A-Za-z0-9]/,
            'Password must contain at least 1 Special Character',
        ),
});

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),

        newPassword: z
            .string()
            .min(6, 'New password must be at least 6 characters'),

        confirmPassword: z.string().min(1, 'Please confirm your new password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
