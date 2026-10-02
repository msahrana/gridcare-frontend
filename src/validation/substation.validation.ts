import { z } from 'zod';
import { zoneSchema } from './zone.validation';

export const substationSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Substation name is required'),
    code: z.string().min(1, 'Substation code is required'),
    zoneId: z.string().uuid(),
    capacity: z.number().nonnegative(),
    isActive: z.boolean(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    zone: zoneSchema,
});

export const substationMetaSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export const substationResponseSchema = z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: z.array(substationSchema),
    meta: substationMetaSchema,
});

export const createSubstationSchema = z.object({
    name: z.string().min(1, 'Substation name is required'),

    code: z.string().min(1, 'Substation code is required'),

    zoneId: z.string().min(1, 'Zone is required'),

    capacity: z
        .string()
        .min(1, 'Capacity is required')
        .refine(
            (value) => !Number.isNaN(Number(value)),
            'Capacity must be a valid number',
        )
        .refine(
            (value) => Number(value) > 0,
            'Capacity must be greater than 0',
        ),
});
