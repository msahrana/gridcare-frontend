import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createZone, getAllZones } from '@/api';
import { ZoneResponse } from '@/interface';

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
