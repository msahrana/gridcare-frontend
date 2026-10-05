import {
    AuditLogsParams,
    IAuditLogResponse,
    ICreateAuditLog,
    SingleAuditLogResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export function createAuditLog(payload: ICreateAuditLog) {
    return apiClient<SingleAuditLogResponse>('/audit-logs', {
        method: 'POST',
        body: payload,
    });
}

export function getAllAuditLogs(params: AuditLogsParams) {
    return apiClient<IAuditLogResponse>('/audit-logs', {
        params,
    });
}

export function getSingleAuditLog(id: string) {
    return apiClient<SingleAuditLogResponse>(`/audit-logs/${id}`);
}

export function getAuditLogByEntity(id: string) {
    return apiClient<IAuditLogResponse>(`/audit-logs/entity/${id}`);
}

export function deleteAuditLog(id: string) {
    return apiClient<SingleAuditLogResponse>(`/audit-logs/${id}`, {
        method: 'DELETE',
    });
}
