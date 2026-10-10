import { useMutation, useQuery } from '@tanstack/react-query';

import {
    createSubscription,
    createSubscriptionPayment,
    getMySubscription,
    getMySubscriptionPayments,
} from '@/api';

export function useCreateSubscription() {
    return useMutation({
        mutationFn: createSubscription,
    });
}

export function useCreateSubscriptionPayment() {
    return useMutation({
        mutationFn: createSubscriptionPayment,
    });
}

export const useGetMySubscriptionPayments = () => {
    return useQuery({
        queryKey: ['subscription-payments', 'my'],
        queryFn: getMySubscriptionPayments,
    });
};

export const useGetMySubscription = () =>
    useQuery({
        queryKey: ['subscription', 'my'],
        queryFn: getMySubscription,
        staleTime: 60 * 1000, // ১ মিনিট cache
        refetchOnMount: true,
        refetchOnWindowFocus: false,
    });
