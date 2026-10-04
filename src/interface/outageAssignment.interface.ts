import {
    OutageAssignmentStatus,
    TechnicianStatus,
    VerificationStatus,
} from '@/types';

import { IOutage } from './outage.interface';

export interface ICreateOutageAssignment {
    outageId: string;
    technicianId: string;
}

export interface IUpdateOutageAssignment {
    id: string;
    status?: OutageAssignmentStatus;
    acceptedAt?: string | null;
    startedAt?: string | null;
    completedAt?: string | null;
}

export interface OutageAssignmentParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IOutageAssignmentAdditionalFile {
    url: string;
    publicId: string;
    resourceType: string;
    originalFilename: string;
}

export interface IOutageAssignmentTechnician {
    id: string;
    userId: string;
    phone: string;
    employeeId: string;
    skills: string;
    experienceYears: number;
    resume: string;
    resumePublicId: string;
    additionalFiles: IOutageAssignmentAdditionalFile[];
    status: TechnicianStatus;
    verificationStatus: VerificationStatus;
    rejectionReason: string | null;
    zoneId: string | null;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IOutageAssignmentUser {
    id: string;
    name: string;
    email: string;
}

export interface IOutageAssignment {
    id: string;
    outageId: string;
    technicianId: string;
    assignedById: string;
    status: OutageAssignmentStatus;
    assignedAt: string;
    acceptedAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
    outage: IOutage;
    technician: IOutageAssignmentTechnician;
    assignedBy: IOutageAssignmentUser;
}

export interface IOutageAssignmentMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IOutageAssignmentResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        data: IOutageAssignment[];
        meta: IOutageAssignmentMeta;
    };
}

export interface SingleOutageAssignmentResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IOutageAssignment;
}
