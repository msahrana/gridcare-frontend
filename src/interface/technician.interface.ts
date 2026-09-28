import { User } from './auth.interface';

export interface TechnicianApplicationData {
    user: {
        name: string;
        email: string;
    };
    doctor: {
        specialization: string;
        licenseNumber: string;
        qualifications: string;
        experienceYears: number;
        contactNumber: string;
        address: string;
        consultationFee: number | undefined;
        bio: string;
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
    specialization: string;
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
    doctorId: string;
    verificationStatus: 'AVAILABLE' | 'OFFLINE';
    rejectionReason?: string;
}

export interface PublicTechnicianProfile {
    id: string;
    name: string;
    specialization: string;
    licenseNumber: string;
    qualifications: string;
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
