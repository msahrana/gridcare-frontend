import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    cancelAutomatedSchedule,
    createAutomatedSchedule,
    getAllAutomatedSchedules,
    publishAutomatedSchedule,
} from '@/api';

import {
    AutomatedScheduleParams,
    IAutomatedScheduleResponse,
    ICreateAutomatedSchedule,
} from '@/interface';

export function useCreateAutomatedSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateAutomatedSchedule) =>
            createAutomatedSchedule(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['automated-schedules'],
            });
        },
    });
}

export function useGetAllAutomatedSchedules(params: AutomatedScheduleParams) {
    return useQuery<IAutomatedScheduleResponse>({
        queryKey: ['automated-schedules', params],
        queryFn: () => getAllAutomatedSchedules(params),
    });
}

export function useSuspenseGetAllAutomatedSchedules(
    params: AutomatedScheduleParams,
) {
    return useSuspenseQuery<IAutomatedScheduleResponse>({
        queryKey: ['automated-schedules', params],
        queryFn: () => getAllAutomatedSchedules(params),
    });
}

export function usePublishAutomatedSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => publishAutomatedSchedule(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['automated-schedules'],
            });
        },
    });
}

export function useCancelAutomatedSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => cancelAutomatedSchedule(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['automated-schedules'],
            });
        },
    });
}
