import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    cancelSubscription,
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

export function useCancelSubscription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (subscriptionId: string) =>
            cancelSubscription(subscriptionId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['subscriptions-history'],
            });
            queryClient.invalidateQueries({ queryKey: ['my-subscription'] });
        },
    });
}
