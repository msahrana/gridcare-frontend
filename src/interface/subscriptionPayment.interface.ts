export interface ICreateSubscriptionPayload {
    planId: string;
}

export interface ICreateSubscriptionPaymentPayload {
    subscriptionId: string;
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

export interface IMySubscriptionPayment {
    id: string;
    userId: string;
    subscriptionId: string;
    status: string;
    bkashTrxId: string | null;
    subscription?: {
        id: string;
        planId: string;
    };
}

export interface IMySubscriptionPaymentsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IMySubscriptionPayment[];
}

// Current subscription
export interface IMySubscription {
    id: string;
    userId: string;
    planId: string;
    startDate: string;
    endDate: string;
    status: 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
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
        status: string;
        amount: string;
        currency: string;
        paymentGateway: 'BKASH' | 'STRIPE';
        merchantInvoiceNumber: string;
        bkashPaymentId: string | null;
        bkashTrxId: string | null;
        paidAt: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
}

export interface IMySubscriptionResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IMySubscription | null;
}

export interface IMySubscriptionPaymentItem {
    id: string;
    userId: string;
    subscriptionId: string;
    status: string;
    amount: string;
    currency: string;
    paymentGateway: 'BKASH' | 'STRIPE';
    merchantInvoiceNumber: string;
    bkashPaymentId: string | null;
    bkashTrxId: string | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IMySubscription {
    id: string;
    userId: string;
    planId: string;
    startDate: string;
    endDate: string;
    status: 'PENDING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
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
    payments: IMySubscriptionPaymentItem[];
}

export interface IMySubscriptionResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IMySubscription | null;
}
