import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createZone, deleteZone, getAllZones, updateZone } from '@/api';
import { IUpdateZone, ZoneResponse } from '@/interface';

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

export function useGetAllZones() {
    return useQuery<ZoneResponse>({
        queryKey: ['zones'],
        queryFn: getAllZones,
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
