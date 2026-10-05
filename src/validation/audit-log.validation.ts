import { z } from 'zod';

export const createAuditLogSchema = z.object({
    action: z.string().min(1, 'Action is required'),

    entity: z.string().min(1, 'Entity is required'),

    entityId: z.string().uuid('Invalid entity ID'),

    oldValue: z.record(z.string(), z.unknown()).nullable(),

    newValue: z.record(z.string(), z.unknown()).nullable(),
});

export const auditLogActorSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
});

export const auditLogSchema = z.object({
    id: z.string(),
    actorId: z.string(),

    action: z.string(),
    entity: z.string(),
    entityId: z.string(),

    oldValue: z.record(z.string(), z.unknown()).nullable(),
    newValue: z.record(z.string(), z.unknown()).nullable(),

    ipAddress: z.string().nullable(),

    createdAt: z.string(),

    actor: auditLogActorSchema,
});

export const auditLogMetaSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export const auditLogResponseSchema = z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),

    data: z.object({
        data: z.array(auditLogSchema),
        meta: auditLogMetaSchema,
    }),
});

export const singleAuditLogResponseSchema = z.object({
    success: z.boolean(),
    statusCode: z.number().optional(),
    message: z.string(),
    data: auditLogSchema,
});
