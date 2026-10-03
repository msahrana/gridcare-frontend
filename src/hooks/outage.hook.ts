import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import { createOutage, deleteOutage, getAllOutages, updateOutage } from '@/api';

import { IOutageResponse, IUpdateOutage, OutagesParams } from '@/interface';

export function useCreateOutage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOutage,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outages'],
            });
        },
    });
}

export function useGetAllOutages(params: OutagesParams) {
    return useQuery<IOutageResponse>({
        queryKey: ['outages', params],
        queryFn: () => getAllOutages(params),
    });
}

export function useSuspenseGetAllOutages(params: OutagesParams) {
    return useSuspenseQuery<IOutageResponse>({
        queryKey: ['outages', params],
        queryFn: () => getAllOutages(params),
    });
}

export function useUpdateOutage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateOutage) =>
            updateOutage(payload.id, {
                status: payload.status,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outages'],
            });
        },
    });
}

export function useDeleteOutage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteOutage(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outages'],
            });
        },
    });
}
