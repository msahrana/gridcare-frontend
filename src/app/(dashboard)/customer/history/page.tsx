'use client';

import { useState } from 'react';

import {
    CalendarDays,
    CheckCircle2,
    CreditCard,
    Loader2,
    ReceiptText,
    XCircle,
} from 'lucide-react';

import {
    useCancelSubscription,
    useSuspenseGetMySubscriptionHistory,
} from '@/hooks';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const History = () => {
    const { data } = useSuspenseGetMySubscriptionHistory();

    const subscriptionHistory = data?.data ?? [];

    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
        string | null
    >(null);

    const { mutate: cancelSubscription, isPending: isCancelling } =
        useCancelSubscription();

    const selectedSubscription = subscriptionHistory.find(
        (subscription) => subscription.id === selectedSubscriptionId,
    );

    const handleCancel = () => {
        if (!selectedSubscriptionId) return;

        cancelSubscription(selectedSubscriptionId, {
            onSuccess: () => {
                setSelectedSubscriptionId(null);
            },
        });
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Subscription History
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        View and manage your subscription plans.
                    </p>
                </div>

                {/* Empty State */}
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

                            const isActive = subscription.status === 'ACTIVE';

                            // Payment is successful only when
                            // payment status is PAID and bKash transaction ID exists
                            const isPaymentSuccessful =
                                payment?.status === 'PAID' &&
                                !!payment?.bkashTrxId;

                            return (
                                <div
                                    key={subscription.id}
                                    className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    {/* Top */}
                                    <div className="border-b p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                                    Subscription Plan
                                                </p>

                                                <h2 className="mt-1 truncate text-xl font-semibold">
                                                    {subscription.plan.name}
                                                </h2>
                                            </div>

                                            <span
                                                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                                                    isActive
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
                                        {/* Dates */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                    <CalendarDays className="size-3.5" />
                                                    Start Date
                                                </div>

                                                <p className="text-sm font-medium">
                                                    {new Date(
                                                        subscription.startDate,
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                    )}
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
                                                    ).toLocaleDateString(
                                                        'en-GB',
                                                    )}
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

                                                    <span
                                                        className={`text-xs font-medium ${
                                                            payment.status ===
                                                            'PAID'
                                                                ? 'text-emerald-600'
                                                                : 'text-muted-foreground'
                                                        }`}
                                                    >
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
                                                                {
                                                                    payment.currency
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-xs text-muted-foreground">
                                                            Gateway
                                                        </p>

                                                        <p className="mt-0.5 text-sm font-semibold">
                                                            {
                                                                payment.paymentGateway
                                                            }
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

                                        {/* Cancel */}
                                        {isActive && (
                                            <div className="border-t pt-4">
                                                <Button
                                                    variant="outline"
                                                    className={
                                                        isPaymentSuccessful
                                                            ? 'w-full cursor-not-allowed'
                                                            : 'w-full text-destructive hover:bg-destructive/10 hover:text-destructive'
                                                    }
                                                    onClick={() => {
                                                        if (isPaymentSuccessful)
                                                            return;

                                                        setSelectedSubscriptionId(
                                                            subscription.id,
                                                        );
                                                    }}
                                                    disabled={
                                                        isCancelling ||
                                                        isPaymentSuccessful
                                                    }
                                                >
                                                    {isPaymentSuccessful ? (
                                                        <>
                                                            <CheckCircle2 className="mr-2 size-4 text-emerald-600" />
                                                            Payment Successful
                                                        </>
                                                    ) : (
                                                        <>
                                                            <XCircle className="mr-2 size-4" />
                                                            Cancel Subscription
                                                        </>
                                                    )}
                                                </Button>

                                                {isPaymentSuccessful && (
                                                    <p className="mt-2 text-center text-xs text-muted-foreground">
                                                        This subscription has
                                                        already been paid
                                                        successfully and cannot
                                                        be cancelled.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Confirmation Dialog */}
            <Dialog
                open={!!selectedSubscriptionId}
                onOpenChange={(open) => {
                    if (!open && !isCancelling) {
                        setSelectedSubscriptionId(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-destructive/10">
                            <XCircle className="size-6 text-destructive" />
                        </div>

                        <DialogTitle>Cancel subscription?</DialogTitle>

                        <DialogDescription>
                            Are you sure you want to cancel your{' '}
                            <span className="font-medium text-foreground">
                                {selectedSubscription?.plan.name}
                            </span>{' '}
                            subscription?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="rounded-lg border bg-muted/40 p-4 text-sm">
                        <p className="text-muted-foreground">
                            Your subscription will be marked as cancelled.
                            Please make sure you really want to continue.
                        </p>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedSubscriptionId(null)}
                            disabled={isCancelling}
                        >
                            Keep Subscription
                        </Button>

                        <Button
                            variant="destructive"
                            onClick={handleCancel}
                            disabled={isCancelling}
                        >
                            {isCancelling ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Cancelling...
                                </>
                            ) : (
                                <>
                                    <XCircle className="mr-2 size-4" />
                                    Yes, Cancel
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default History;
