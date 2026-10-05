import {
    OutagePriority,
    OutageStatus,
    OutageType,
    RestorationStatus,
    TechnicianStatus,
    VerificationStatus,
} from '@/types';

/* =========================
   Create
========================= */

export interface ICreateRestoration {
    outageId: string;
    technicianId: string;
    remarks?: string;
}

/* =========================
   Update
========================= */

export interface IUpdateRestoration {
    id: string;
    completedAt?: string;
    duration?: number;
    status?: RestorationStatus;
    remarks?: string;
}

/* =========================
   Area
========================= */

export interface IRestorationArea {
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

/* =========================
   Outage
========================= */

export interface IRestorationOutage {
    id: string;
    areaId: string;
    title: string;
    description: string;
    type: OutageType;
    priority: OutagePriority;
    status: OutageStatus;
    startedAt: string;
    restoredAt: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    area: IRestorationArea;
}

/* =========================
   Technician File
========================= */

export interface IRestorationAdditionalFile {
    url: string;
    publicId: string;
    resourceType: string;
    originalFilename: string;
}

/* =========================
   Technician
========================= */

export interface IRestorationTechnician {
    id: string;
    userId: string;
    phone: string;
    employeeId: string;
    skills: string;
    experienceYears: number;
    resume: string;
    resumePublicId: string;

    additionalFiles: IRestorationAdditionalFile[];

    status: TechnicianStatus;
    verificationStatus: VerificationStatus;

    rejectionReason: string | null;
    zoneId: string | null;
    deletedAt: string | null;

    createdAt: string;
    updatedAt: string;
}

/* =========================
   Restoration
========================= */

export interface IRestoration {
    id: string;
    outageId: string;
    technicianId: string;

    startedAt: string;
    completedAt: string | null;
    duration: number | null;

    status: RestorationStatus;
    remarks: string;

    createdAt: string;
    updatedAt: string;

    outage: IRestorationOutage;
    technician: IRestorationTechnician;
}

/* =========================
   Pagination
========================= */

export interface IRestorationMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
}

export interface IRestorationListData {
    data: IRestoration[];
    meta: IRestorationMeta;
}

/* =========================
   Responses
========================= */

export interface IRestorationResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IRestorationListData;
}

export interface SingleRestorationResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data: IRestoration;
}

/* =========================
   Params
========================= */

export interface RestorationsParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    status?: RestorationStatus;
    technicianId?: string;
    outageId?: string;
}
