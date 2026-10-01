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

export type TechnicianStatus = 'AVAILABLE' | 'OFFLINE';

export interface TechnicianAdditionalFile {
    url: string;
    publicId: string;
    resourceType: string;
    originalFilename: string;
}

export interface TechnicianUser {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    emailVerified: boolean;
    isDeleted: boolean;
    needPasswordChange: boolean;
    googleId: string | null;
    authProvider: string;
    imageUrl: string;
    imagePublicId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface Technician {
    id: string;
    userId: string;
    phone: string | null;
    employeeId: string;
    bio?: string | null;
    address?: string | null;
    skills: string;
    experienceYears: number;
    resume: string;
    resumePublicId: string;
    additionalFiles?: TechnicianAdditionalFile[] | null;
    status: TechnicianStatus;
    verificationStatus: TechnicianVerificationStatus;
    rejectionReason: string | null;
    zoneId: string | null;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    user: TechnicianUser;
}

export interface TechnicianMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface TechnicianResponse {
    data: Technician[];
    meta: TechnicianMeta;
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
    verificationStatus: 'APPROVED' | 'REJECTED';
    rejectionReason?: string;
}
