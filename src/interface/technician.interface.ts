import { User } from './auth.interface';

export interface TechnicianApplicationData {
    user: {
        name: string;
        email: string;
    };

    technician: {
        phone: string;
        employeeId: string;
        skills?: string;
        experienceYears: number;
        technicianFee?: number;
        zoneId?: string;
        bio?: string;
    };
}

export interface TechnicianApplicationPayload {
    resume: File;
    additionalFiles: File[];
    data: TechnicianApplicationData;
}

export type TechnicianVerificationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Technician {
    id: string;
    name: string;
    email: string;
    address?: string | null;
    licenseNumber: string;
    qualifications: string;
    experienceYears: number;
    bio?: string | null;
    consultationFee?: number | string | null;
    contactNumber?: string | null;
    verificationStatus: TechnicianVerificationStatus;
    rejectionReason?: string | null;
    reviewedBy?: string | null;
    reviewedAt?: string | null;
    resume?: string | null;
    additionalFiles?: { url: string; publicId: string }[] | null;
    isDeleted: boolean;
    deletedAt?: null | string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: User;
}

export interface TechnicianParams {
    verificationStatus?: TechnicianVerificationStatus;
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortOrder?: 'desc' | 'asc';
}

export interface ApproveTechnicianPayload {
    technicianId: string;
    verificationStatus: 'AVAILABLE' | 'OFFLINE';
    rejectionReason?: string;
}

export interface PublicTechnicianProfile {
    id: string;
    name: string;
    specialization: string;
    licenseNumber: string;
    experienceYears: number;
    bio?: string | null;
    consultationFee?: number | string | null;
    createdAt: string;
}

export interface PublicTechnicianParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    specialization?: string;
    sortBy?: string;
    sortOrder?: 'desc' | 'asc';
}
