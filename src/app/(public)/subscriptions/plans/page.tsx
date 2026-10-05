'use client';

import { Button } from '@/components/ui/button';
import {
    useCreateSubscriptionPayment,
    useGetAllSubscriptionPlans,
} from '@/hooks';

const SubscriptionPlans = () => {
    const { data, isLoading, isError } = useGetAllSubscriptionPlans();

    const { mutateAsync: createPayment, isPending } =
        useCreateSubscriptionPayment();

    const plans = data?.data ?? [];

    const handlePayment = async (planId: string) => {
        try {
            const result = await createPayment({
                planId,
                paymentGateway: 'BKASH',
            });

            const bkashURL = result?.data?.bkashURL;

            if (!bkashURL) {
                console.error('bKash checkout URL not found');
                return;
            }

            window.location.href = bkashURL;
        } catch (error) {
            console.error('Failed to create bKash payment:', error);
        }
    };

    if (isLoading) {
        return <div className="p-6">Loading subscription plans...</div>;
    }

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Failed to load subscription plans.
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">Subscription Plans</h1>

                <p className="text-muted-foreground">
                    Choose a subscription plan to continue.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="rounded-xl border bg-card p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <h2 className="text-lg font-semibold">
                                {plan.name}
                            </h2>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                    plan.status === 'ACTIVE'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {plan.status}
                            </span>
                        </div>

                        <p className="mt-3 min-h-20 text-sm text-muted-foreground">
                            {plan.description}
                        </p>

                        <div className="mt-5">
                            <span className="text-3xl font-bold">
                                ৳{plan.price}
                            </span>
                        </div>

                        <p className="mt-1 text-sm text-muted-foreground">
                            {plan.durationDays} days
                        </p>

                        <div className="mt-5 border-t pt-4 text-sm">
                            <span className="text-muted-foreground">
                                Active subscriptions:{' '}
                            </span>

                            <span className="font-semibold">
                                {plan._count.subscriptions}
                            </span>
                        </div>

                        <Button
                            type="button"
                            disabled={isPending || plan.status !== 'ACTIVE'}
                            onClick={() => handlePayment(plan.id)}
                            className="mt-6 w-full hover:bg-[#0055B8]"
                        >
                            {isPending ? 'Processing...' : 'Pay with bKash'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubscriptionPlans;
