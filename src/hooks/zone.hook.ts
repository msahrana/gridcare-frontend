import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import { createZone, deleteZone, getAllZones, updateZone } from '@/api';
import { IUpdateZone, ZoneParams, ZoneResponse } from '@/interface';

export function useCreateZone() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createZone,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['zones'],
            });
        },
    });
}

export function useGetAllZones(params: ZoneParams) {
    return useQuery<ZoneResponse>({
        queryKey: ['zones', params],
        queryFn: () => getAllZones(params),
    });
}

export function useSuspenseGetAllZones(params: ZoneParams) {
    return useSuspenseQuery<ZoneResponse>({
        queryKey: ['zones', params],
        queryFn: () => getAllZones(params),
    });
}

export function useUpdateZone() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateZone) =>
            updateZone(payload.id, {
                name: payload.name,
                code: payload.code,
                description: payload.description,
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['zones'] });
        },
    });
}

export function useDeleteZone() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteZone(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['zones'] });
        },
    });
}
