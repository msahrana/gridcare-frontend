import { UserRole } from '@/types';

export interface ICreateAuditLog {
    action: string;
    entity: string;
    entityId: string;

    oldValue: Record<string, unknown> | null;
    newValue: Record<string, unknown> | null;
}

export interface IAuditLogActor {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface IAuditLog {
    id: string;

    actorId: string;

    action: string;
    entity: string;
    entityId: string;

    oldValue: Record<string, unknown> | null;
    newValue: Record<string, unknown> | null;

    ipAddress: string | null;

    createdAt: string;

    actor: IAuditLogActor;
}

export interface IAuditLogMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IAuditLogListData {
    data: IAuditLog[];
    meta: IAuditLogMeta;
}

export interface IAuditLogResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IAuditLogListData;
}

export interface SingleAuditLogResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data: IAuditLog;
}

export interface AuditLogsParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    actorId?: string;
    entity?: string;
    entityId?: string;
    action?: string;
}
