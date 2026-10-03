import { z } from 'zod';
import { IOutageResponse } from '@/interface';

export const createOutageSchema = z.object({
    areaId: z.string().min(1, 'Area is required'),

    title: z
        .string()
        .min(1, 'Outage title is required')
        .max(200, 'Title must not exceed 200 characters'),

    description: z
        .string()
        .min(1, 'Description is required')
        .max(1000, 'Description must not exceed 1000 characters'),

    type: z.enum(['PLANNED', 'UNEXPECTED'], {
        message: 'Outage type is required',
    }),

    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], {
        message: 'Priority is required',
    }),

    status: z.enum(
        [
            'REPORTED',
            'VERIFIED',
            'ASSIGNED',
            'IN_PROGRESS',
            'RESTORED',
            'CLOSED',
            'CANCELLED',
        ],
        {
            message: 'Status is required',
        },
    ),

    startedAt: z.string().min(1, 'Start date and time is required'),
});

export const outageAreaSchema = z.object({
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
});

export const outageReportSchema = z.object({
    id: z.string(),
    outageId: z.string(),
    reporterId: z.string(),
    areaId: z.string(),
    description: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const outageTechnicianSchema = z.object({
    id: z.string(),
    userId: z.string(),
    phone: z.string(),
    employeeId: z.string(),
    skills: z.string(),
    experienceYears: z.number(),
    resume: z.string(),
    resumePublicId: z.string(),

    additionalFiles: z.array(
        z.object({
            url: z.string(),
            publicId: z.string(),
            resourceType: z.string(),
            originalFilename: z.string(),
        }),
    ),

    status: z.string(),
    verificationStatus: z.string(),
    rejectionReason: z.string().nullable(),
    zoneId: z.string().nullable(),
    deletedAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const assignedBySchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    status: z.string(),
    emailVerified: z.boolean(),
    isDeleted: z.boolean(),
    needPasswordChange: z.boolean(),
    googleId: z.string().nullable(),
    authProvider: z.string(),
    imageUrl: z.string(),
    imagePublicId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
});

export const outageAssignmentSchema = z.object({
    id: z.string(),
    outageId: z.string(),
    technicianId: z.string(),
    assignedById: z.string(),
    status: z.string(),
    assignedAt: z.string(),
    acceptedAt: z.string().nullable(),
    startedAt: z.string().nullable(),
    completedAt: z.string().nullable(),

    technician: outageTechnicianSchema,
    assignedBy: assignedBySchema,
});

export const outageSchema = z.object({
    id: z.string(),
    areaId: z.string(),
    title: z.string(),
    description: z.string(),

    type: z.string(),
    priority: z.string(),
    status: z.string(),

    startedAt: z.string(),
    restoredAt: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),

    area: outageAreaSchema,
    reports: z.array(outageReportSchema),
    assignments: z.array(outageAssignmentSchema),
});

export const outageMetaSchema = z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    totalPage: z.number(),
});

export const outageResponseSchema = z.object({
    data: z.array(outageSchema),
    meta: outageMetaSchema,
});

export interface IApiOutageResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IOutageResponse;
}

export const apiOutageResponseSchema = z.object({
    success: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: outageResponseSchema,
});
