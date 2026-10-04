import {
    ICreateLoadSheddingSchedule,
    ILoadSheddingScheduleResponse,
    IUpdateLoadSheddingSchedule,
    LoadSheddingScheduleParams,
    SingleLoadSheddingScheduleResponse,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createLoadSheddingSchedule(
    payload: ICreateLoadSheddingSchedule,
) {
    return apiClient<SingleLoadSheddingScheduleResponse>(
        '/load-shedding-schedules',
        {
            method: 'POST',
            body: payload,
        },
    );
}

export function getAllLoadSheddingSchedules(
    params: LoadSheddingScheduleParams,
) {
    return apiClient<ILoadSheddingScheduleResponse>(
        '/load-shedding-schedules',
        { params },
    );
}

export function updateLoadSheddingSchedule(
    id: string,
    payload: Omit<IUpdateLoadSheddingSchedule, 'id'>,
) {
    return apiClient<SingleLoadSheddingScheduleResponse>(
        `/load-shedding-schedules/${id}`,
        {
            method: 'PATCH',
            body: payload,
        },
    );
}

export function deleteLoadSheddingSchedule(id: string) {
    return apiClient<SingleLoadSheddingScheduleResponse>(
        `/load-shedding-schedules/${id}`,
        {
            method: 'DELETE',
        },
    );
}
