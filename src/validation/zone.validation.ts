import { z } from 'zod';

export const zoneSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Zone name is required'),
    code: z.string().min(1, 'Zone code is required'),
    description: z.string().min(1, 'Description is required'),
    isActive: z.boolean(),
    deletedAt: z.string().datetime().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export type Zone = z.infer<typeof zoneSchema>;
