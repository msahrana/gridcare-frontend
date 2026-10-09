import type {
    ICreateSubscriptionPayload,
    ICreateSubscriptionPaymentPayload,
    ICreateSubscriptionPaymentResponse,
    IMySubscriptionPaymentsResponse,
    IMySubscriptionResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export const createSubscription = async (
    payload: ICreateSubscriptionPayload,
) => {
    return apiClient('/subscriptions', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

export const createSubscriptionPayment = async (
    payload: ICreateSubscriptionPaymentPayload,
): Promise<ICreateSubscriptionPaymentResponse> => {
    return apiClient('/subscription-payments/create', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

export const getMySubscriptionPayments =
    async (): Promise<IMySubscriptionPaymentsResponse> => {
        return apiClient('/subscription-payments/my', {
            method: 'GET',
        });
    };

export const getMySubscription = async (): Promise<IMySubscriptionResponse> => {
    return apiClient('/subscriptions/my-subscription', {
        method: 'GET',
    });
};
