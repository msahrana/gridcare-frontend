import { z } from 'zod';

export const createNotificationValidationSchema = z.object({
    userId: z.string().uuid('Invalid user ID'),

    title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must not exceed 200 characters'),

    message: z
        .string()
        .min(1, 'Message is required')
        .max(1000, 'Message must not exceed 1000 characters'),
});

export const updateNotificationValidationSchema = z.object({
    id: z.string().uuid('Invalid notification ID'),

    isRead: z.boolean(),
});
