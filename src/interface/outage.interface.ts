import {
    AuthProvider,
    OutageStatus,
    OutageType,
    Priority,
    TechnicianStatus,
    TechnicianVerificationStatus,
    UserRole,
    UserStatus,
} from '@/types';

export interface ICreateOutage {
    areaId: string;
    title: string;
    description: string;
    type: OutageType;
    priority: Priority;
    status: OutageStatus;
    startedAt: string;
}

export interface IUpdateOutage {
    id: string;
    status: OutageStatus;
}

export interface IOutageArea {
    id: string;
    name: string;
    code: string;
    zoneId: string;
    substationId: string;
    feederId: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    isActive: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ITechnicianAdditionalFile {
    url: string;
    publicId: string;
    resourceType: string;
    originalFilename: string;
}

export interface IOutageTechnician {
    id: string;
    userId: string;
    phone: string;
    employeeId: string | null;

    skills: string;

    experienceYears: number;
    resume: string | null;
    resumePublicId: string | null;
    additionalFiles: ITechnicianAdditionalFile[];

    status: TechnicianStatus;
    verificationStatus: TechnicianVerificationStatus;

    rejectionReason: string | null;
    zoneId: string | null;

    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IAssignedBy {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    isDeleted: boolean;
    needPasswordChange: boolean;

    googleId: string | null;
    authProvider: AuthProvider;

    imageUrl: string | null;
    imagePublicId: string | null;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IOutage {
    id: string;
    areaId: string;

    title: string;
    description: string;

    type: OutageType;
    priority: Priority;
    status: OutageStatus;

    startedAt: string;
    restoredAt: string | null;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    area: IOutageArea;
    // reports: IOutageReport[];
    // assignments: IOutageAssignment[];
}

export interface IOutageMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface IOutageListData {
    data: IOutage[];
    meta: IOutageMeta;
}

export interface IOutageResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IOutageListData;
}

export interface SingleOutageResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data: IOutage;
}

export interface OutagesParams {
    page?: number;
    limit?: number;
    search?: string;
    areaId?: string;
    status?: OutageStatus;
    type?: OutageType;
    priority?: Priority;
}

export interface IOutageFormValues {
    areaId: string;
    title: string;
    description: string;
    type: OutageType;
    priority: Priority;
    status: OutageStatus;
    startedAt: string;
}

export interface OutageFormValues {
    areaId: string;
    title: string;
    description: string;
    type: OutageType;
    priority: Priority;
    status: OutageStatus;
    startedAt: string;
}
