import { z } from 'zod';

const zoneSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const substationSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    zoneId: z.string(),
    capacity: z.number(),
    isActive: z.boolean(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const feederSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    substationId: z.string(),
    status: z.string(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

/* =========================
   CREATE AREA
========================= */

export const createAreaSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Area name must be at least 2 characters.')
        .max(100, 'Area name must not exceed 100 characters.'),

    code: z
        .string()
        .trim()
        .min(2, 'Area code is required.')
        .max(50, 'Area code must not exceed 50 characters.'),

    zoneId: z.string().min(1, 'Please select a zone.'),

    substationId: z.string().min(1, 'Please select a substation.'),

    feederId: z.string().min(1, 'Please select a feeder.'),

    address: z
        .string()
        .trim()
        .min(2, 'Address is required.')
        .max(255, 'Address must not exceed 255 characters.'),

    latitude: z
        .number()
        .min(-90, 'Latitude must be between -90 and 90.')
        .max(90, 'Latitude must be between -90 and 90.'),

    longitude: z
        .number()
        .min(-180, 'Longitude must be between -180 and 180.')
        .max(180, 'Longitude must be between -180 and 180.'),

    isActive: z.boolean(),
});

/* =========================
   AREA RESPONSE
========================= */

export const areaSchema = z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    zoneId: z.string(),
    substationId: z.string(),
    feederId: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    isActive: z.boolean(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),

    zone: zoneSchema,
    substation: substationSchema,
    feeder: feederSchema,
});

export const paginationMetaSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export const areaResponseSchema = z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: z.array(areaSchema),
    meta: paginationMetaSchema,
});
