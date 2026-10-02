import { z } from 'zod';

export const feederStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']);

export const createFeederSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Feeder name is required')
        .max(100, 'Feeder name must not exceed 100 characters'),

    code: z
        .string()
        .trim()
        .min(1, 'Feeder code is required')
        .max(50, 'Feeder code must not exceed 50 characters'),

    substationId: z.string().uuid('Invalid substation ID'),

    status: feederStatusSchema,
});

export const updateFeederSchema = z.object({
    id: z.string().uuid('Invalid feeder ID'),

    name: z
        .string()
        .trim()
        .min(1, 'Feeder name is required')
        .max(100, 'Feeder name must not exceed 100 characters'),

    code: z
        .string()
        .trim()
        .min(1, 'Feeder code is required')
        .max(50, 'Feeder code must not exceed 50 characters'),

    substationId: z.string().uuid('Invalid substation ID'),

    status: feederStatusSchema,
});

export const feederQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional(),

    limit: z.coerce.number().int().positive().optional(),

    searchTerm: z.string().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(['asc', 'desc']).optional(),
});
