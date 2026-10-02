import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { createFeeder,  deleteFeeder, getAllFeeders, updateFeeder } from '@/api';
import { FeederParams, IFeederResponse, IUpdateFeeder } from '@/interface';

export function useCreateFeeder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFeeder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['feeders'],
            });
        },
    });
}

export function useGetAllFeeders(params: FeederParams) {
    return useQuery<IFeederResponse>({
        queryKey: ['feeders', params],
        queryFn: () => getAllFeeders(params),
    });
}

export function useSuspenseGetAllFeeders(params: FeederParams) {
    return useSuspenseQuery<IFeederResponse>({
        queryKey: ['feeders', params],
        queryFn: () => getAllFeeders(params),
    });
}

export function useUpdateFeeder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateFeeder) =>
            updateFeeder(payload.id, {
                name: payload.name,
                code: payload.code,
                substationId: payload.substationId,
                status: payload.status,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['feeders'],
            });
        },
    });
}

export function useDeleteFeeder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteFeeder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['feeders'],
            });
        },
    });
}
