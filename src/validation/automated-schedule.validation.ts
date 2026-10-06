import { z } from 'zod';

export const createAutomatedScheduleSchema = z.object({
    areaIds: z.array(z.string().uuid()).min(1, 'At least one area is required'),

    date: z.string().min(1, 'Date is required'),
    startTime: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            'Start time must be in HH:mm format',
        ),

    endTime: z
        .string()
        .regex(
            /^([01]\d|2[0-3]):([0-5]\d)$/,
            'End time must be in HH:mm format',
        ),

    title: z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must not exceed 200 characters'),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(1000, 'Description must not exceed 1000 characters'),
});
