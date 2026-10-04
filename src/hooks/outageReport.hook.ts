import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    IOutageReportResponse,
    IUpdateOutageReport,
    OutageReportsParams,
} from '@/interface';
import {
    createOutageReport,
    deleteOutageReport,
    getAllOutageReports,
    updateOutageReport,
} from '@/api';

export function useCreateOutageReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOutageReport,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outage-reports'],
            });
        },
    });
}

export function useGetAllOutageReports(params: OutageReportsParams) {
    return useQuery<IOutageReportResponse>({
        queryKey: ['outage-reports', params],
        queryFn: () => getAllOutageReports(params),
    });
}

export function useSuspenseGetAllOutageReports(params: OutageReportsParams) {
    return useSuspenseQuery<IOutageReportResponse>({
        queryKey: ['outage-reports', params],
        queryFn: () => getAllOutageReports(params),
    });
}

export function useUpdateOutageReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateOutageReport) =>
            updateOutageReport(payload.id, {
                description: payload.description,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outage-reports'],
            });
        },
    });
}

export function useDeleteOutageReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteOutageReport(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outage-reports'],
            });
        },
    });
}
