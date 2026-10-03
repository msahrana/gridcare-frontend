import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { createArea, deleteArea, getAllAreas, updateArea } from '@/api';
import { AreaParams, IAreaResponse, IUpdateArea } from '@/interface';

export function useCreateArea() {
    const queruClient = useQueryClient();

    return useMutation({
        mutationFn: createArea,

        onSuccess: () => {
            queruClient.invalidateQueries({
                queryKey: ['areas'],
            });
        },
    });
}

export function useGetAllAreas(params: AreaParams) {
    return useQuery<IAreaResponse>({
        queryKey: ['areas', params],
        queryFn: () => getAllAreas(params),
    });
}

export function useSuspenseGetAllAreas(params: AreaParams) {
    return useSuspenseQuery<IAreaResponse>({
        queryKey: ['areas', params],
        queryFn: () => getAllAreas(params),
    });
}

export function useUpdateArea() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateArea) =>
            updateArea(payload.id, {
                name: payload.name,
                code: payload.code,
                zoneId: payload.zoneId,
                substationId: payload.substationId,
                feederId: payload.feederId,
                address: payload.address,
                latitude: payload.latitude,
                longitude: payload.longitude,
                isActive: payload.isActive,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['areas'],
            });
        },
    });
}

export function useDeleteArea() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteArea(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['areas'],
            });
        },
    });
}
