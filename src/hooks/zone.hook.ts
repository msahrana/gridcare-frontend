import { useMutation, useQuery } from '@tanstack/react-query';
import { createZone, getAllZones } from '@/api';
import { ZoneResponse } from '@/interface';

export function useCreateZone() {
    return useMutation({
        mutationFn: createZone,
    });
}

export function useGetAllZones() {
    return useQuery<ZoneResponse>({
        queryKey: ['zones'],
        queryFn: getAllZones,
    });
}
