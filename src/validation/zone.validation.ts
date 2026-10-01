import { z } from 'zod';

export const zoneSchema = z.object({
    name: z.string().min(1, 'Zone name is required'),
    code: z.string().min(1, 'Zone code is required'),
    description: z.string().min(1, 'Description is required'),
});

export type ZoneFormValues = z.infer<typeof zoneSchema>;
