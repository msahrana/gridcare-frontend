import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createSubstation,
    getAllSubstations,
    updateSubstation,
    deleteSubstation,
} from '@/api';

import {
    ISubstationResponse,
    IUpdateSubstation,
    SubstationParams,
} from '@/interface';

export function useCreateSubstation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSubstation,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['substations'],
            });
        },
    });
}

export function useGetAllSubstations(params: SubstationParams) {
    return useQuery<ISubstationResponse>({
        queryKey: ['substations', params],
        queryFn: () => getAllSubstations(params),
    });
}

export function useSuspenseGetAllSubstations(params: SubstationParams) {
    return useSuspenseQuery<ISubstationResponse>({
        queryKey: ['substations', params],
        queryFn: () => getAllSubstations(params),
    });
}

export function useUpdateSubstation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateSubstation) =>
            updateSubstation(payload.id, {
                name: payload.name,
                code: payload.code,
                zoneId: payload.zoneId,
                capacity: payload.capacity,
                isActive: payload.isActive,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['substations'],
            });
        },
    });
}

export function useDeleteSubstation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteSubstation(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['substations'],
            });
        },
    });
}
