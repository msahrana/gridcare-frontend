import type { ISubscriptionPlanResponse } from '@/interface';

import apiClient from '@/lib/apiClient';

export const getAllSubscriptionPlans =
    async (): Promise<ISubscriptionPlanResponse> => {
        return apiClient('/subscriptions/plans', {
            method: 'GET',
        });
    };
