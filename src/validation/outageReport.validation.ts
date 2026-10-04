import { z } from 'zod';

export const createOutageReportValidationSchema = z.object({
    outageId: z
        .string({ message: 'Outage ID is required' })
        .uuid('Invalid outage ID'),

    areaId: z
        .string({ message: 'Area ID is required' })
        .uuid('Invalid area ID'),

    description: z
        .string({ message: 'Description is required' })
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description must not exceed 1000 characters'),

    latitude: z
        .number({ message: 'Latitude is required' })
        .min(-90, 'Invalid latitude')
        .max(90, 'Invalid latitude'),

    longitude: z
        .number({ message: 'Longitude is required' })
        .min(-180, 'Invalid longitude')
        .max(180, 'Invalid longitude'),
});

export const updateOutageReportValidationSchema = z.object({
    description: z
        .string({ message: 'Description is required' })
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description must not exceed 1000 characters'),
});
