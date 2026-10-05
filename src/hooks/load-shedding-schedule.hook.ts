import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createLoadSheddingSchedule,
    deleteLoadSheddingSchedule,
    getAllLoadSheddingSchedules,
    updateLoadSheddingSchedule,
} from '@/api';
import {
    ILoadSheddingScheduleResponse,
    IUpdateLoadSheddingSchedule,
    LoadSheddingScheduleParams,
} from '@/interface';

export function useCreateLoadSheddingSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLoadSheddingSchedule,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['load-shedding-schedules'],
            });
        },
    });
}

export function useGetAllLoadSheddingSchedules(
    params: LoadSheddingScheduleParams,
) {
    return useQuery<ILoadSheddingScheduleResponse>({
        queryKey: ['load-shedding-schedules', params],
        queryFn: () => getAllLoadSheddingSchedules(params),
    });
}

export function useSuspenseGetAllLoadSheddingSchedules(
    params: LoadSheddingScheduleParams,
) {
    return useSuspenseQuery<ILoadSheddingScheduleResponse>({
        queryKey: ['load-shedding-schedules', params],
        queryFn: () => getAllLoadSheddingSchedules(params),
    });
}

export function useUpdateLoadSheddingSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...payload }: IUpdateLoadSheddingSchedule) =>
            updateLoadSheddingSchedule(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['load-shedding-schedules'],
            });
        },
    });
}

export function useDeleteLoadSheddingSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteLoadSheddingSchedule(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['load-shedding-schedules'],
            });
        },
    });
}
