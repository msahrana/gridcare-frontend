'use client';

import { useState } from 'react';
import { Check, Loader2, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    useCreateSubscription,
    useCreateSubscriptionPayment,
    useGetAllSubscriptionPlans,
} from '@/hooks';
// import { IMySubscriptionPayment } from '@/interface';

const SubscriptionPlans = () => {
    const { data, isLoading, isError } = useGetAllSubscriptionPlans();

    // const { data: paymentsData, isLoading: isPaymentsLoading } =
    //     useGetMySubscriptionPayments();

    const {
        mutateAsync: createSubscription,
        isPending: isCreatingSubscription,
    } = useCreateSubscription();

    const { mutateAsync: createPayment, isPending: isCreatingPayment } =
        useCreateSubscriptionPayment();

    const [processingPlanId, setProcessingPlanId] = useState<string | null>(
        null,
    );

    const plans = data?.data ?? [];

    // Adjust this path if your API response uses a different structure.
    //     const payments = paymentsData?.data ?? [];

    //     // Check whether a plan already has a successfully paid payment.
    //     const isPlanPaid = (planId: string): boolean => {
    //     return payments.some(
    //         (payment: IMySubscriptionPayment) =>
    //             payment.subscription?.planId === planId &&
    //             payment.status === 'PAID' &&
    //             Boolean(payment.bkashTrxId),
    //     );
    // };

    const handlePayment = async (planId: string) => {
        try {
            setProcessingPlanId(planId);

            const subscriptionResponse = await createSubscription({ planId });
            const subscriptionId = subscriptionResponse?.data?.id;

            if (!subscriptionId) {
                throw new Error('Subscription ID not found');
            }

            const paymentResponse = await createPayment({
                subscriptionId,
                paymentGateway: 'BKASH',
            });

            const bkashURL = paymentResponse?.data?.bkashURL;

            if (!bkashURL) {
                throw new Error('bKash checkout URL not found');
            }

            window.location.href = bkashURL;
        } catch (error) {
            console.error('Subscription payment failed:', error);
        } finally {
            setProcessingPlanId(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="size-5 animate-spin" />
                    Loading subscription plans...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold">
                        Failed to load plans
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <div className="text-center">
                    <h2 className="text-lg font-semibold">
                        No subscription plans available
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Please check back later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div>
                <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck className="size-5 text-[#0055B8]" />

                    <span className="text-sm font-medium text-[#0055B8]">
                        GridCare Premium
                    </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight">
                    Subscription Plans
                </h1>

                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Choose a plan to get priority access to upcoming load
                    shedding schedules.
                </p>
            </div>

            {/* Plans */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {plans.map((plan) => {
                    const isProcessing = processingPlanId === plan.id;
                    const isActive = plan.status === 'ACTIVE';
                    // const isPaid = isPlanPaid(plan.id);

                    return (
                        <div
                            key={plan.id}
                            className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                        >
                            {/* Plan name */}
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {plan.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Premium subscription
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                        isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {plan.status}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="mt-6">
                                <span className="text-4xl font-bold">
                                    ৳{plan.price}
                                </span>

                                <span className="ml-2 text-sm text-muted-foreground">
                                    BDT
                                </span>
                            </div>

                            {/* Duration */}
                            <p className="mt-2 text-sm text-muted-foreground">
                                Valid for {plan.durationDays} days
                            </p>

                            {/* Description */}
                            <p className="mt-5 min-h-16 text-sm leading-6 text-muted-foreground">
                                {plan.description}
                            </p>

                            {/* Features */}
                            <div className="mt-5 space-y-3 border-t pt-5">
                                <div className="flex items-center gap-2 text-sm">
                                    <Check className="size-4 text-green-600" />
                                    <span>
                                        Priority load shedding schedules
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <Check className="size-4 text-green-600" />
                                    <span>Upcoming schedule access</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <Check className="size-4 text-green-600" />
                                    <span>Secure bKash payment</span>
                                </div>
                            </div>

                            {/* Subscribers */}
                            <div className="mt-5 rounded-lg bg-muted/50 px-4 py-3 text-sm">
                                <span className="text-muted-foreground">
                                    Active subscriptions:{' '}
                                </span>

                                <span className="font-semibold">
                                    {plan._count?.subscriptions ?? 0}
                                </span>
                            </div>

                            {/* Payment button */}
                            <Button
                                type="button"
                                className="mt-6 w-full bg-[#0055B8] hover:bg-[#004494] disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={
                                    !isActive ||
                                    isProcessing ||
                                    isCreatingSubscription ||
                                    isCreatingPayment
                                }
                                onClick={() => handlePayment(plan.id)}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Pay with bKash'
                                )}
                            </Button>

                            {/* Already-paid message */}
                            {/* {isPaid && (
                                <p className="mt-3 text-center text-sm font-medium text-green-600">
                                    Payment already completed for this plan.
                                </p>
                            )} */}

                            {!isActive && (
                                <p className="mt-2 text-center text-xs text-muted-foreground">
                                    This plan is currently unavailable.
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SubscriptionPlans;
