'use client';

import {
    CalendarDays,
    CheckCircle2,
    CreditCard,
    ReceiptText,
} from 'lucide-react';

import { useSuspenseGetMySubscriptionHistory } from '@/hooks';

const History = () => {
    const { data } = useSuspenseGetMySubscriptionHistory();

    const subscriptionHistory = data?.data ?? [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Subscription History
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    View your previous and current subscription plans.
                </p>
            </div>

            {/* Empty state */}
            {subscriptionHistory.length === 0 ? (
                <div className="flex min-h-60 items-center justify-center rounded-xl border bg-card">
                    <div className="text-center">
                        <ReceiptText className="mx-auto mb-3 size-10 text-muted-foreground" />
                        <h3 className="font-semibold">
                            No subscription history
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            You don't have any subscription records yet.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {subscriptionHistory.map((subscription) => {
                        const payment = subscription.payments?.[0];

                        return (
                            <div
                                key={subscription.id}
                                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                            >
                                {/* Top section */}
                                <div className="border-b p-5">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                Subscription Plan
                                            </p>

                                            <h2 className="mt-1 text-xl font-semibold">
                                                {subscription.plan.name}
                                            </h2>
                                        </div>

                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                                                subscription.status === 'ACTIVE'
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                        >
                                            <CheckCircle2 className="size-3.5" />
                                            {subscription.status}
                                        </span>
                                    </div>

                                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                                        {subscription.plan.description}
                                    </p>
                                </div>

                                {/* Details */}
                                <div className="space-y-4 p-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                <CalendarDays className="size-3.5" />
                                                Start Date
                                            </div>

                                            <p className="text-sm font-medium">
                                                {new Date(
                                                    subscription.startDate,
                                                ).toLocaleDateString('en-GB')}
                                            </p>
                                        </div>

                                        <div>
                                            <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                <CalendarDays className="size-3.5" />
                                                End Date
                                            </div>

                                            <p className="text-sm font-medium">
                                                {new Date(
                                                    subscription.endDate,
                                                ).toLocaleDateString('en-GB')}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    {payment && (
                                        <div className="rounded-xl bg-muted/50 p-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <CreditCard className="size-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">
                                                        Payment
                                                    </span>
                                                </div>

                                                <span className="text-xs font-medium text-emerald-600">
                                                    {payment.status}
                                                </span>
                                            </div>

                                            <div className="flex items-end justify-between gap-4">
                                                <div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Amount
                                                    </p>

                                                    <p className="mt-0.5 text-lg font-bold">
                                                        {payment.amount}{' '}
                                                        <span className="text-sm font-medium">
                                                            {payment.currency}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xs text-muted-foreground">
                                                        Gateway
                                                    </p>

                                                    <p className="mt-0.5 text-sm font-semibold">
                                                        {payment.paymentGateway}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Transaction */}
                                    {payment?.bkashTrxId && (
                                        <div className="flex items-center justify-between border-t pt-4">
                                            <span className="text-xs text-muted-foreground">
                                                Transaction ID
                                            </span>

                                            <span className="font-mono text-xs font-medium">
                                                {payment.bkashTrxId}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default History;
