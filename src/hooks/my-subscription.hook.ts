import { useSuspenseQuery } from '@tanstack/react-query';
import { getMySubscription } from '@/api';

export const useSuspenseGetMySubscription = () => {
    return useSuspenseQuery({
        queryKey: ['my-subscription'],
        queryFn: getMySubscription,
    });
};
