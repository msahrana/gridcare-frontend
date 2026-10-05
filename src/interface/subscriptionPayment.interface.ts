export interface ICreateSubscriptionPaymentPayload {
    planId: string;
    paymentGateway?: 'BKASH';
}

export interface ICreateSubscriptionPaymentResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        paymentId: string;
        bkashURL: string;
        reused: boolean;
    };
}