import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
    createSubscriptionPayment,
    getAllSubscriptionPlans,
    getMySubscriptionHistory,
} from '@/api';
import { SubscriptionHistoryParams } from '@/interface';

export const useGetAllSubscriptionPlans = () => {
    return useQuery({
        queryKey: ['subscription-plans'],
        queryFn: getAllSubscriptionPlans,
    });
};

export const useCreateSubscriptionPayment = () => {
    return useMutation({
        mutationFn: createSubscriptionPayment,
    });
};

export function useSuspenseGetMySubscriptionHistory(
    params?: SubscriptionHistoryParams,
) {
    return useSuspenseQuery({
        queryKey: ['subscriptions-history', params],
        queryFn: () => getMySubscriptionHistory(params),
    });
}
