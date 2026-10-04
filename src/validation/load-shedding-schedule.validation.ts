import { z } from 'zod';

export const createLoadSheddingScheduleValidationSchema = z
    .object({
        areaId: z
            .string({ message: 'Area is required' })
            .uuid('Invalid area ID'),

        title: z
            .string({ message: 'Title is required' })
            .trim()
            .min(3, 'Title must be at least 3 characters')
            .max(200, 'Title must not exceed 200 characters'),

        description: z
            .string({ message: 'Description is required' })
            .trim()
            .min(10, 'Description must be at least 10 characters')
            .max(1000, 'Description must not exceed 1000 characters'),

        startTime: z
            .string({ message: 'Start time is required' })
            .min(1, 'Start time is required'),

        endTime: z
            .string({ message: 'End time is required' })
            .min(1, 'End time is required'),

        scheduleFee: z
            .number({ message: 'Schedule fee is required' })
            .min(0, 'Schedule fee cannot be negative'),
    })
    .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
        message: 'End time must be after start time',
        path: ['endTime'],
    });

export const updateLoadSheddingScheduleValidationSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(3, 'Title must be at least 3 characters')
            .max(200, 'Title must not exceed 200 characters')
            .optional(),

        description: z
            .string()
            .trim()
            .min(10, 'Description must be at least 10 characters')
            .max(1000, 'Description must not exceed 1000 characters')
            .optional(),

        startTime: z.string().min(1, 'Start time is required').optional(),

        endTime: z.string().min(1, 'End time is required').optional(),

        scheduleFee: z
            .number({ message: 'Schedule fee must be a number' })
            .min(0, 'Schedule fee cannot be negative')
            .optional(),
    })
    .refine(
        (data) => {
            if (!data.startTime || !data.endTime) {
                return true;
            }

            return new Date(data.endTime) > new Date(data.startTime);
        },
        {
            message: 'End time must be after start time',
            path: ['endTime'],
        },
    );
