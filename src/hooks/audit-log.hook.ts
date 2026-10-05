import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createAuditLog,
    deleteAuditLog,
    getAllAuditLogs,
    getAuditLogByEntity,
    getSingleAuditLog,
} from '@/api';

import {
    AuditLogsParams,
    IAuditLogResponse,
    SingleAuditLogResponse,
} from '@/interface';

export function useCreateAuditLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAuditLog,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['audit-logs'],
            });
        },
    });
}

export function useGetAllAuditLogs(params: AuditLogsParams) {
    return useQuery<IAuditLogResponse>({
        queryKey: ['audit-logs', params],
        queryFn: () => getAllAuditLogs(params),
    });
}

export function useSuspenseGetAllAuditLogs(params: AuditLogsParams) {
    return useSuspenseQuery<IAuditLogResponse>({
        queryKey: ['audit-logs', params],
        queryFn: () => getAllAuditLogs(params),
    });
}

export function useGetSingleAuditLog(id: string) {
    return useQuery<SingleAuditLogResponse>({
        queryKey: ['audit-log', id],
        queryFn: () => getSingleAuditLog(id),
        enabled: !!id,
    });
}

export function useGetSingleAuditLogByEntity(id: string) {
    return useQuery<IAuditLogResponse>({
        queryKey: ['audit-logs', 'entity', id],
        queryFn: () => getAuditLogByEntity(id),
        enabled: !!id,
    });
}

export function useDeleteAuditLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAuditLog,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['audit-logs'],
            });
        },
    });
}
