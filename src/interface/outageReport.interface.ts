
import {
    AuthProvider,
    OutageStatus,
    OutageType,
    Priority,
    UserRole,
    UserStatus,
} from '@/types';

export interface ICreateOutageReport {
    outageId: string;
    areaId: string;
    description: string;
    latitude: number;
    longitude: number;
}

export interface IUpdateOutageReport {
    id: string;
    description: string;
}

export interface IOutageReportReporter {
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

export interface IOutageReportArea {
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

export interface IOutageReportOutage {
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
}

export interface IOutageReport {
    id: string;

    outageId: string | null;
    reporterId: string;
    areaId: string;

    description: string;

    latitude: number | null;
    longitude: number | null;

    createdAt: string;
    updatedAt: string;

    reporter: IOutageReportReporter;
    area: IOutageReportArea;
    outage: IOutageReportOutage | null;
}

export interface IOutageReportMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IOutageReportListData {
    data: IOutageReport[];
    meta: IOutageReportMeta;
}

export interface IOutageReportResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IOutageReportListData;
}

export interface SingleOutageReportResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data: IOutageReport;
}

export interface OutageReportsParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    areaId?: string;
    outageId?: string;
    reporterId?: string;
}
