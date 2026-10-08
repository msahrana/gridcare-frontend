'use client';

import Link from 'next/link';

import {
    AlertTriangle,
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock3,
    CreditCard,
    FileWarning,
    MapPin,
    ShieldCheck,
    Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CustomerDashboard = () => {
    // Replace these with API data
    const stats = {
        activeOutages: 2,
        upcomingSchedules: 3,
        outageReports: 5,
        subscriptionStatus: 'Active',
    };

    const recentReports = [
        {
            id: 1,
            title: 'Unexpected Power Outage',
            area: "Cox's Bazar Sadar",
            status: 'RESOLVED',
            date: '08 Oct 2026',
        },
        {
            id: 2,
            title: 'Voltage Issue Report',
            area: 'Cox Bazar Area',
            status: 'IN PROGRESS',
            date: '07 Oct 2026',
        },
        {
            id: 3,
            title: 'Power Interruption',
            area: 'Sadar Area',
            status: 'REPORTED',
            date: '05 Oct 2026',
        },
    ];

    const upcomingSchedules = [
        {
            id: 1,
            title: 'Scheduled Maintenance',
            area: "Cox's Bazar Sadar",
            startTime: '10:00 AM',
            endTime: '12:00 PM',
            date: '09 Oct 2026',
        },
        {
            id: 2,
            title: 'Planned Power Maintenance',
            area: 'Chakaria',
            startTime: '02:00 PM',
            endTime: '04:00 PM',
            date: '11 Oct 2026',
        },
    ];

    return (
        <div className="min-h-screen space-y-8 p-6">
            {/* =====================================================
                Welcome Banner
            ====================================================== */}

            <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#0055B8] to-[#0077D9] p-6 text-white shadow-sm md:p-8">
                {/* Decorative Elements */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-white/10" />

                <div className="pointer-events-none absolute -bottom-24 right-20 size-64 rounded-full bg-white/5" />

                {/* Content */}
                <div className="relative z-10 max-w-2xl">
                    <div className="mb-3 flex items-center gap-2 text-sm text-blue-100">
                        <Zap className="size-4" />
                        GridCare Customer Portal
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                        Welcome back!
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100 md:text-base">
                        Stay informed about power outages, upcoming load
                        shedding schedules, and your GridCare subscription.
                    </p>

                    <div className="relative z-20 mt-5 flex flex-wrap gap-3">
                        <Button>
                            <Link
                                type="submit"
                                href="/customer/get-all-outage-reports"
                                className="inline-flex h-10 items-center justify-center px-4 py-2 text-sm font-medium text-[#0055B8] shadow-sm transition-colors"
                            >
                                View Outages
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>

                        <Link
                            href="/customer/my-subscription"
                            className="inline-flex h-10 items-center justify-center rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
                        >
                            My Subscription
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================
                Statistics
            ====================================================== */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Active Outages */}
                <Link
                    href="/customer/get-all-outage-reports"
                    className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Active Outages
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {stats.activeOutages}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Currently affecting your area
                            </p>
                        </div>

                        <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                            <AlertTriangle className="size-5" />
                        </div>
                    </div>

                    <Button className="mt-4 flex items-center text-xs font-medium hover:bg-[#0055B8] text-white">
                        View outage reports
                        <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>

                {/* Upcoming Schedules */}
                <Link
                    href="/customer/upcoming-load-shedding-schedules"
                    className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Upcoming Schedules
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {stats.upcomingSchedules}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Planned power interruptions
                            </p>
                        </div>

                        <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                            <CalendarDays className="size-5" />
                        </div>
                    </div>

                    <Button className="mt-4 flex items-center text-xs font-medium text-white hover:bg-[#0055B8]">
                        View schedules
                        <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>

                {/* Reports */}
                <Link
                    href="/customer/get-all-outage-reports"
                    className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                My Reports
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {stats.outageReports}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Reports submitted by you
                            </p>
                        </div>

                        <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-[#0055B8] dark:bg-blue-950/40 dark:text-blue-400">
                            <FileWarning className="size-5" />
                        </div>
                    </div>

                    <Button className="mt-4 flex items-center text-xs font-medium text-white hover:bg-[#0055B8]">
                        View my reports
                        <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>

                {/* Subscription */}
                <Link
                    href="/customer/my-subscription"
                    className="group rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Subscription
                            </p>

                            <p className="mt-2 text-xl font-bold text-emerald-600">
                                {stats.subscriptionStatus}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Premium service active
                            </p>
                        </div>

                        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <ShieldCheck className="size-5" />
                        </div>
                    </div>

                    <Button className="mt-4 flex items-center text-xs font-medium text-white hover:bg-[#0055B8]">
                        Manage subscription
                        <ArrowRight className="ml-1 size-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </section>

            {/* =====================================================
                Main Content
            ====================================================== */}
            <section className="grid gap-6 lg:grid-cols-3">
                {/* Upcoming Load Shedding */}
                <div className="rounded-2xl border bg-card shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between border-b p-5">
                        <div>
                            <h2 className="font-semibold">
                                Upcoming Load Shedding
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Scheduled power interruptions in your area
                            </p>
                        </div>

                        <Link
                            href="/customer/upcoming-load-shedding"
                            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors bg-[#0055B8] hover:bg-muted hover:text-foreground"
                        >
                            View All
                            <ArrowRight className="ml-2 size-4" />
                        </Link>
                    </div>

                    <div className="divide-y">
                        {upcomingSchedules.map((schedule) => (
                            <div
                                key={schedule.id}
                                className="p-5 transition-colors hover:bg-muted/40"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                                            <Clock3 className="size-5" />
                                        </div>

                                        <div>
                                            <h3 className="font-medium">
                                                {schedule.title}
                                            </h3>

                                            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <MapPin className="size-3.5" />
                                                {schedule.area}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-sm font-semibold">
                                            {schedule.date}
                                        </p>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {schedule.startTime} —{' '}
                                            {schedule.endTime}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscription */}
                <div className="rounded-2xl border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex size-11 items-center justify-center rounded-xl bg-[#0055B8]/10 text-[#0055B8]">
                            <CreditCard className="size-5" />
                        </div>

                        <div>
                            <h2 className="font-semibold">My Subscription</h2>

                            <p className="text-sm text-muted-foreground">
                                Premium Plan
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-xl bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Status
                            </span>

                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                                <CheckCircle2 className="size-4" />
                                Active
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Plan
                            </span>

                            <span className="text-sm font-semibold">
                                Annual Premium
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                                Valid Until
                            </span>

                            <span className="text-sm font-semibold">
                                06 Sep 2027
                            </span>
                        </div>
                    </div>

                    <Link
                        href="/customer/my-subscription"
                        className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-[#ff8a00] hover:bg-[#0055B8] px-4 py-2 text-sm font-medium text-primary-foreground transition-colors"
                    >
                        Manage Subscription
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </div>
            </section>

            {/* =====================================================
                Recent Reports
            ====================================================== */}
            <section className="rounded-2xl border bg-card shadow-sm">
                <div className="flex items-center justify-between border-b p-5">
                    <div>
                        <h2 className="font-semibold">Recent Reports</h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Your recently submitted outage reports
                        </p>
                    </div>

                    <Link
                        href="/customer/get-all-outage-reports"
                        className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors bg-[#0055B8] hover:bg-muted hover:text-foreground"
                    >
                        View All
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </div>

                <div className="divide-y">
                    {recentReports.map((report) => (
                        <div
                            key={report.id}
                            className="flex flex-col gap-3 p-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                                    <FileWarning className="size-4 text-muted-foreground" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium">
                                        {report.title}
                                    </h3>

                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="size-3" />
                                            {report.area}
                                        </span>

                                        <span>•</span>

                                        <span>{report.date}</span>
                                    </div>
                                </div>
                            </div>

                            <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                                    report.status === 'RESOLVED'
                                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                        : report.status === 'IN PROGRESS'
                                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400'
                                          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                                }`}
                            >
                                {report.status}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* =====================================================
                Quick Actions
            ====================================================== */}
            <section>
                <div className="mb-4">
                    <h2 className="font-semibold">Quick Actions</h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Quickly access the services you use most.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Report Outage */}
                    <Link
                        href="/customer/get-all-outage-reports"
                        className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-sm"
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                            <AlertTriangle className="size-5" />
                        </div>

                        <div className="text-left">
                            <p className="font-medium">Report an Outage</p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Report a power issue
                            </p>
                        </div>

                        <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* Load Shedding */}
                    <Link
                        href="/customer/upcoming-load-shedding-schedules"
                        className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-sm"
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
                            <CalendarDays className="size-5" />
                        </div>

                        <div className="text-left">
                            <p className="font-medium">Load Shedding</p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                View upcoming schedules
                            </p>
                        </div>

                        <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* Subscription */}
                    <Link
                        href="/customer/my-subscription"
                        className="group flex items-center gap-4 rounded-xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-sm"
                    >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0055B8] dark:bg-blue-950/40 dark:text-blue-400">
                            <CreditCard className="size-5" />
                        </div>

                        <div className="text-left">
                            <p className="font-medium">Subscription</p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Manage your plan
                            </p>
                        </div>

                        <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default CustomerDashboard;
