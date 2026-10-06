import {
    AutomatedScheduleParams,
    IAutomatedScheduleResponse,
    ICreateAutomatedSchedule,
    SingleAutomatedScheduleResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export function createAutomatedSchedule(payload: ICreateAutomatedSchedule) {
    return apiClient<SingleAutomatedScheduleResponse>(
        '/automated-schedules/generate',
        {
            method: 'POST',
            body: payload,
        },
    );
}

export function getAllAutomatedSchedules(params: AutomatedScheduleParams) {
    return apiClient<IAutomatedScheduleResponse>('/automated-schedules', {
        params,
    });
}

export function publishAutomatedSchedule(id: string) {
    return apiClient<SingleAutomatedScheduleResponse>(
        `/automated-schedules/${id}/publish`,
        {
            method: 'PATCH',
        },
    );
}

export function cancelAutomatedSchedule(id: string) {
    return apiClient<SingleAutomatedScheduleResponse>(
        `/automated-schedules/${id}/cancel`,
        {
            method: 'PATCH',
        },
    );
}
