import { z } from 'zod';

export const createOutageAssignmentSchema = z.object({
    outageId: z.string().min(1, 'Outage is required'),

    technicianId: z.string().min(1, 'Technician is required'),
});

export const updateOutageAssignmentSchema = z.object({
    status: z.enum([
        'ASSIGNED',
        'ACCEPTED',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED',
    ]),
});

export const outageAssignmentQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional(),

    limit: z.coerce.number().int().min(1).max(100).optional(),

    searchTerm: z.string().optional(),

    sortBy: z.string().optional(),

    sortOrder: z.enum(['asc', 'desc']).optional(),
});

export type CreateOutageAssignmentFormValues = z.infer<
    typeof createOutageAssignmentSchema
>;

export type UpdateOutageAssignmentFormValues = z.infer<
    typeof updateOutageAssignmentSchema
>;

export type OutageAssignmentQueryValues = z.infer<
    typeof outageAssignmentQuerySchema
>;
