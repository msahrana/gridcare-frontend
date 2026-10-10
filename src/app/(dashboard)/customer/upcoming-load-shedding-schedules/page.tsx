'use client';

import Link from 'next/link';

import { CalendarDays, Clock, Info, MapPin, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
    useGetMySubscription,
    useGetUpcomingLoadSheddingSchedule,
} from '@/hooks';
import { IMySubscriptionPaymentItem } from '@/interface';
import GlobalLoading from '@/app/loading';

const UpcomingLoadSheddingSchedules = () => {
    const {
        data: subscriptionResponse,
        isPending: isSubscriptionPending,
        isError: isSubscriptionError,
        refetch,
        isRefetching,
    } = useGetMySubscription();

    const subscription = subscriptionResponse?.data;

    const now = Date.now();

    const startTime = subscription
        ? new Date(subscription.startDate).getTime()
        : Number.NaN;

    const endTime = subscription
        ? new Date(subscription.endDate).getTime()
        : Number.NaN;

    const hasPaidPayment =
        subscription?.payments?.some(
            (payment: IMySubscriptionPaymentItem) => payment.status === 'PAID',
        ) ?? false;

    const isPaidCustomer =
        subscription?.status === 'ACTIVE' &&
        Number.isFinite(startTime) &&
        Number.isFinite(endTime) &&
        startTime <= now &&
        endTime > now &&
        hasPaidPayment;

    if (isSubscriptionPending || isRefetching) {
        return <GlobalLoading />;
    }

    // Subscription loading state
    if (isSubscriptionPending) {
        return (
            <div className="mx-auto mt-5 flex min-h-60 w-full max-w-7xl items-center justify-center px-4 sm:px-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 size-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

                    <p className="text-sm text-muted-foreground">
                        Checking your subscription...
                    </p>
                </div>
            </div>
        );
    }

    // Subscription verification error
    if (isSubscriptionError) {
        return (
            <div className="mx-auto mt-5 flex min-h-72 w-full max-w-7xl flex-col items-center justify-center rounded-2xl border bg-card p-8 text-center shadow-sm">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-muted">
                    <ShieldCheck className="size-8 text-muted-foreground" />
                </div>

                <h2 className="text-xl font-bold">
                    Unable to Verify Subscription
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    We could not verify your subscription right now. Please
                    check your connection and try again.
                </p>

                <Button
                    className="mt-5"
                    onClick={() => void refetch()}
                    disabled={isRefetching}
                >
                    {isRefetching ? 'Checking...' : 'Try Again'}
                </Button>
            </div>
        );
    }

    // Subscription required
    if (!isPaidCustomer) {
        return (
            <div className="mx-auto mt-5 flex min-h-80 w-full max-w-7xl flex-col items-center justify-center rounded-2xl border bg-card px-5 py-10 text-center shadow-sm sm:px-8">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="size-8 text-primary" />
                </div>

                <h2 className="text-xl font-bold tracking-tight">
                    Subscription Required
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                    Upcoming load shedding schedules are available exclusively
                    to customers with an active paid subscription. Subscribe to
                    GridCare to stay informed about power interruptions in your
                    area.
                </p>

                <Link
                    href="/subscriptions/plans"
                    className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#ff8a00] px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    View Subscription Plans
                </Link>

                <p className="mt-4 text-xs text-muted-foreground">
                    Stay informed. Stay prepared with GridCare.
                </p>
            </div>
        );
    }

    // Only render schedule query after subscription verification
    return <PaidCustomerSchedules />;
};

const PaidCustomerSchedules = () => {
    const { data, isPending, isFetching } =
        useGetUpcomingLoadSheddingSchedule();

    if (isPending || (!data && isFetching)) {
        return <GlobalLoading />;
    }

    const schedules = data?.data ?? [];

    return (
        <div className="mx-auto mt-5 w-full max-w-7xl space-y-6 px-4 pb-8 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                        <CalendarDays className="size-5 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Upcoming Load Shedding Schedules
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Stay informed about load shedding schedules in your
                            area.
                        </p>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {schedules.length === 0 ? (
                <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border bg-card p-8 text-center shadow-sm">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                        <CalendarDays className="size-8 text-muted-foreground" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        No Load Shedding Schedules
                    </h2>

                    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                        There are currently no load shedding schedules available
                        for your area. Please check back later for updates.
                    </p>
                </div>
            ) : (
                /* Schedule Cards */
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {schedules.map((schedule) => {
                        const startDate = new Date(schedule.startTime);
                        const endDate = new Date(schedule.endTime);

                        const statusClass =
                            schedule.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                                : schedule.status === 'ACTIVE'
                                  ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300';

                        return (
                            <div
                                key={schedule.id}
                                className="group flex flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Title and Status */}
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h2 className="line-clamp-2 font-semibold leading-6">
                                            {schedule.title}
                                        </h2>

                                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <MapPin className="size-3.5 shrink-0" />
                                            <span className="truncate">
                                                {schedule.area?.name ??
                                                    'Area not specified'}
                                            </span>
                                        </p>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
                                    >
                                        {schedule.status}
                                    </span>
                                </div>

                                {/* Description */}
                                {schedule.description && (
                                    <div className="mt-4 flex gap-3 rounded-xl bg-muted/50 p-3">
                                        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                        <p className="line-clamp-3 text-sm leading-5 text-muted-foreground">
                                            {schedule.description}
                                        </p>
                                    </div>
                                )}

                                {/* Schedule Information */}
                                <div className="mt-5 flex-1 space-y-4">
                                    {/* Date */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <CalendarDays className="size-4 text-primary" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Date
                                            </p>

                                            <p className="mt-1 text-sm font-medium">
                                                {startDate.toLocaleDateString(
                                                    'en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    },
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                                            <Clock className="size-4 text-orange-600" />
                                        </div>

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Load Shedding Time
                                            </p>

                                            <p className="mt-1 text-sm font-medium">
                                                {startDate.toLocaleTimeString(
                                                    'en-US',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    },
                                                )}{' '}
                                                -{' '}
                                                {endDate.toLocaleTimeString(
                                                    'en-US',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    },
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Area */}
                                    <div className="flex items-start gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                                            <MapPin className="size-4 text-blue-600" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Area
                                            </p>

                                            <p className="mt-1 text-sm font-medium">
                                                {schedule.area?.name ??
                                                    'Area not specified'}
                                            </p>

                                            {schedule.area?.address && (
                                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
                                                    {schedule.area.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UpcomingLoadSheddingSchedules;
