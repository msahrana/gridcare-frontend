import type {
    ICreateSubscriptionPaymentPayload,
    ICreateSubscriptionPaymentResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export const createSubscriptionPayment = async (
    payload: ICreateSubscriptionPaymentPayload,
): Promise<ICreateSubscriptionPaymentResponse> => {
    return apiClient('/subscription-payments/create', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};
