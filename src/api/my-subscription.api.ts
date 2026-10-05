import apiClient from '@/lib/apiClient';

export const getMySubscription = async () => {
    return apiClient('/subscriptions/my-subscription');
};
