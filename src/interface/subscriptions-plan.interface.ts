export interface ISubscriptionPlan {
    id: string;
    name: string;
    description: string | null;
    price: string | number;
    durationDays: number;
    status: 'ACTIVE' | 'INACTIVE';
    _count: {
        subscriptions: number;
    };
}

export interface ISubscriptionPlanResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ISubscriptionPlan[];
}

export interface SubscriptionHistoryParams {
    id: string;
    userId: string;
    planId: string;
    startDate: string;
    endDate: string;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED' | 'CANCELLED';
    createdAt: string;
    updatedAt: string;
    plan: {
        id: string;
        name: string;
        description: string;
        price: string;
        durationDays: number;
        status: 'ACTIVE' | 'INACTIVE';
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    };
    payments: {
        id: string;
        userId: string;
        subscriptionId: string;
        status: 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED';
        amount: string;
        currency: string;
        paymentGateway: 'BKASH';
        merchantInvoiceNumber: string;
        bkashPaymentId: string | null;
        bkashTrxId: string | null;
        payerReference: string | null;
        gatewayResponse: Record<string, unknown> | null;
        paidAt: string | null;
        refundTrxId: string | null;
        refundReason: string | null;
        refundedAt: string | null;
        refundAmount: string | null;
        stripeSessionId: string | null;
        stripePaymentIntentId: string | null;
        stripeCustomerId: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
}

export interface ISubscriptionHistory {
    id: string;
    userId: string;
    planId: string;
    startDate: string;
    endDate: string;
    status: 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
    createdAt: string;
    updatedAt: string;

    plan: {
        id: string;
        name: string;
        description: string;
        price: string;
        durationDays: number;
        status: 'ACTIVE' | 'INACTIVE';
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
    };

    payments: {
        id: string;
        userId: string;
        subscriptionId: string;
        status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
        amount: string;
        currency: string;
        paymentGateway: 'BKASH';
        merchantInvoiceNumber: string;
        bkashPaymentId: string | null;
        bkashTrxId: string | null;
        payerReference: string | null;
        gatewayResponse: Record<string, unknown> | null;
        paidAt: string | null;
        refundTrxId: string | null;
        refundReason: string | null;
        refundedAt: string | null;
        refundAmount: string | null;
        stripeSessionId: string | null;
        stripePaymentIntentId: string | null;
        stripeCustomerId: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
}
