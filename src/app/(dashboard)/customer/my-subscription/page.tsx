'use client';

import { useSuspenseGetMySubscription } from '@/hooks';

const MySubscription = () => {
    const { data } = useSuspenseGetMySubscription();

    const subscription = data?.data;

    // No subscription
    if (!subscription) {
        return (
            <div className="space-y-6">
                <div className="ml-5">
                    <h1 className="text-2xl font-bold">My Subscription</h1>

                    <p className="text-sm text-muted-foreground">
                        Manage your subscription and payment information.
                    </p>
                </div>

                <div className="flex min-h-87.5 flex-col items-center justify-center rounded-xl border bg-card p-8 text-center">
                    <h2 className="text-xl font-semibold">
                        No Active Subscription
                    </h2>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        You don't have an active subscription yet. Subscribe to
                        a plan to access premium features.
                    </p>

                    <button
                        type="button"
                        className="mt-5 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        View Subscription Plans
                    </button>
                </div>
            </div>
        );
    }

    const plan = subscription.plan;
    const payment = subscription.payments?.[0];

    const startDate = new Date(subscription.startDate);
    const endDate = new Date(subscription.endDate);

    const remainingDays = Math.max(
        0,
        Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    );

    return (
        <div className="space-y-6">
            <div className="ml-5">
                <h1 className="text-2xl font-bold">My Subscription</h1>

                <p className="text-sm text-muted-foreground">
                    View your current subscription and payment information.
                </p>
            </div>

            {/* Subscription */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold">
                                {plan?.name}
                            </h2>

                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                {subscription.status}
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {plan?.description}
                        </p>
                    </div>

                    <div className="md:text-right">
                        <p className="text-3xl font-bold">৳{plan?.price}</p>

                        <p className="text-sm text-muted-foreground">
                            {plan?.durationDays} days
                        </p>
                    </div>
                </div>
            </div>

            {/* Dates */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">Start Date</p>

                    <p className="mt-2 font-semibold">
                        {startDate.toLocaleDateString()}
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">End Date</p>

                    <p className="mt-2 font-semibold">
                        {endDate.toLocaleDateString()}
                    </p>
                </div>

                <div className="rounded-xl border bg-card p-5">
                    <p className="text-sm text-muted-foreground">
                        Remaining Days
                    </p>

                    <p className="mt-2 text-2xl font-bold">{remainingDays}</p>
                </div>
            </div>

            {/* Payment */}
            {payment && (
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">Payment Details</h2>

                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Amount
                            </p>
                            <p className="mt-1 font-semibold">
                                ৳{payment.amount}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Gateway
                            </p>
                            <p className="mt-1 font-semibold">
                                {payment.paymentGateway}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>
                            <span className="mt-1 inline-block rounded-full bg-green-200 px-3 py-1 text-xs font-medium text-green-700">
                                {payment.status}
                            </span>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Paid At
                            </p>
                            <p className="mt-1 font-semibold">
                                {payment.paidAt
                                    ? new Date(
                                          payment.paidAt,
                                      ).toLocaleDateString()
                                    : 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 border-t pt-5">
                        <p className="text-sm text-muted-foreground">
                            Transaction ID
                        </p>
                        <p className="mt-1 break-all font-mono text-[#0055B8] text-sm">
                            {payment.bkashTrxId || 'N/A'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MySubscription;
