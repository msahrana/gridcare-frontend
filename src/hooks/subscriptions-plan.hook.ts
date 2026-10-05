import { useMutation, useQuery } from '@tanstack/react-query';

import { createSubscriptionPayment, getAllSubscriptionPlans } from '@/api';

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
