import type {
    ISubscriptionHistory,
    ISubscriptionPlanResponse,
    SubscriptionHistoryParams,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export const getAllSubscriptionPlans =
    async (): Promise<ISubscriptionPlanResponse> => {
        return apiClient('/subscriptions/plans', {
            method: 'GET',
        });
    };



export function getMySubscriptionHistory(
    params?: SubscriptionHistoryParams,
) {
    return apiClient<{ data: ISubscriptionHistory[] }>(
        '/subscriptions/history',
        {
            params,
        },
    );
}
