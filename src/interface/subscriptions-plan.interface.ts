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
