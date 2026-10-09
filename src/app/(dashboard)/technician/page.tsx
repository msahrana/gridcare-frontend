'use client';

import Link from 'next/link';
import {
    Activity,
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    Bell,
    CheckCircle2,
    ChevronRight,
    Clock3,
    MapPin,
    ShieldCheck,
    TrendingUp,
    Wrench,
    Zap,
    AlertTriangle,
    ClipboardList,
    Timer,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const TechnicianDashboard = () => {
    // TODO: Replace these sample values with your API data.
    const technician = {
        name: 'Rahim',
        employeeId: 'TECH-2026-001',
        availability: true,
    };

    const stats = [
        {
            title: 'Assigned Outages',
            value: 8,
            description: 'Total assigned to you',
            icon: ClipboardList,
            iconBg: 'bg-blue-50',
            iconColor: 'text-[#0055B8]',
            trend: '+2 this week',
            trendColor: 'text-blue-600',
        },
        {
            title: 'In Progress',
            value: 3,
            description: 'Currently working on',
            icon: Activity,
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            trend: 'Needs attention',
            trendColor: 'text-orange-600',
        },
        {
            title: 'Completed Tasks',
            value: 24,
            description: 'Successfully restored',
            icon: CheckCircle2,
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            trend: '+6 this week',
            trendColor: 'text-emerald-600',
        },
        {
            title: 'Avg. Restoration',
            value: '42 min',
            description: 'Average completion time',
            icon: Timer,
            iconBg: 'bg-violet-50',
            iconColor: 'text-violet-600',
            trend: 'Performance metric',
            trendColor: 'text-violet-600',
        },
    ];

    const assignments = [
        {
            id: 'OUT-1042',
            title: 'Power Distribution Failure',
            area: 'Cox’s Bazar Sadar',
            priority: 'CRITICAL',
            status: 'IN_PROGRESS',
            assignedAt: '10:15 AM',
        },
        {
            id: 'OUT-1043',
            title: 'Feeder Line Maintenance',
            area: 'Kolatoli Area',
            priority: 'HIGH',
            status: 'ASSIGNED',
            assignedAt: '11:30 AM',
        },
        {
            id: 'OUT-1044',
            title: 'Transformer Inspection',
            area: 'Teknaf Substation',
            priority: 'MEDIUM',
            status: 'VERIFIED',
            assignedAt: '12:10 PM',
        },
        {
            id: 'OUT-1045',
            title: 'Electrical Line Fault',
            area: 'Ramu Area',
            priority: 'HIGH',
            status: 'ASSIGNED',
            assignedAt: '01:20 PM',
        },
    ];

    const activities = [
        {
            title: 'Restoration work started',
            description: 'Power Distribution Failure',
            time: '10:25 AM',
            icon: Wrench,
            color: 'bg-blue-50 text-blue-600',
        },
        {
            title: 'New outage assigned',
            description: 'Feeder Line Maintenance',
            time: '11:30 AM',
            icon: ClipboardList,
            color: 'bg-orange-50 text-orange-600',
        },
        {
            title: 'Inspection verified',
            description: 'Transformer Inspection',
            time: '12:10 PM',
            icon: ShieldCheck,
            color: 'bg-emerald-50 text-emerald-600',
        },
    ];

    const getPriorityStyle = (priority: string) => {
        switch (priority) {
            case 'CRITICAL':
                return 'bg-red-50 text-red-700 ring-red-100';
            case 'HIGH':
                return 'bg-orange-50 text-orange-700 ring-orange-100';
            case 'MEDIUM':
                return 'bg-amber-50 text-amber-700 ring-amber-100';
            default:
                return 'bg-slate-100 text-slate-600 ring-slate-200';
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'IN_PROGRESS':
                return 'bg-blue-50 text-blue-700';
            case 'ASSIGNED':
                return 'bg-violet-50 text-violet-700';
            case 'VERIFIED':
                return 'bg-amber-50 text-amber-700';
            case 'RESTORED':
            case 'CLOSED':
                return 'bg-emerald-50 text-emerald-700';
            default:
                return 'bg-slate-100 text-slate-600';
        }
    };

    const formatStatus = (status: string) =>
        status
            .replaceAll('_', ' ')
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return (
        <div className="min-h-screen space-y-6 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                        <Wrench className="h-4 w-4 text-[#0055B8]" />
                        Technician Portal
                        <ChevronRight className="h-3.5 w-3.5" />
                        Dashboard
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Welcome back, {technician.name}!
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Here&apos;s your daily operations overview. Stay safe
                        and keep the power flowing.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div
                        className={`flex items-center gap-2 self-start rounded-full border px-3 py-2.5 ${
                            technician.availability
                                ? 'border-emerald-100 bg-emerald-50'
                                : 'border-slate-200 bg-white'
                        }`}
                    >
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${
                                technician.availability
                                    ? 'bg-emerald-500'
                                    : 'bg-slate-400'
                            }`}
                        />
                        <span
                            className={`text-sm font-medium ${
                                technician.availability
                                    ? 'text-emerald-700'
                                    : 'text-slate-600'
                            }`}
                        >
                            {technician.availability
                                ? 'Available for work'
                                : 'Unavailable'}
                        </span>
                    </div>

                    <Button className="bg-[#ff8a00] hover:bg-[#004494]">
                        <Link href="/technician/outageAssignments">
                            <div className="flex">
                                <ClipboardList className="mr-2 h-4 w-4" />
                                View Assignments
                            </div>
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Operations Notice */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#003B82] via-[#0055B8] to-[#1478D4] p-5 text-white shadow-sm sm:p-7">
                <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border border-white/10" />
                <div className="absolute -right-2 -top-7 h-40 w-40 rounded-full border border-white/10" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50">
                            <Zap className="h-3.5 w-3.5 text-orange-300" />
                            GridCare Field Operations
                        </div>

                        <h2 className="mt-4 text-xl font-bold sm:text-2xl">
                            Every minute counts.
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-blue-100">
                            Review your active assignments, prioritize critical
                            outages, and record restoration progress to keep
                            your team informed.
                        </p>
                    </div>

                    <Link
                        href="/technician/restorations"
                        className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0055B8] transition hover:bg-blue-50"
                    >
                        Manage Restoration
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {stat.title}
                                    </p>
                                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                                        {stat.value}
                                    </p>
                                </div>

                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>

                            <p className="mt-2 text-xs text-slate-500">
                                {stat.description}
                            </p>

                            <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3">
                                {stat.title === 'In Progress' ? (
                                    <AlertTriangle
                                        className={`h-3.5 w-3.5 ${stat.trendColor}`}
                                    />
                                ) : stat.title === 'Avg. Restoration' ? (
                                    <TrendingUp
                                        className={`h-3.5 w-3.5 ${stat.trendColor}`}
                                    />
                                ) : (
                                    <ArrowUpRight
                                        className={`h-3.5 w-3.5 ${stat.trendColor}`}
                                    />
                                )}
                                <span
                                    className={`text-xs font-medium ${stat.trendColor}`}
                                >
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
                {/* Assignments */}
                <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
                    <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0055B8]">
                                    <ClipboardList className="h-4.5 w-4.5" />
                                </div>
                                <h2 className="font-semibold text-slate-900">
                                    My Assignments
                                </h2>
                            </div>

                            <p className="mt-2 text-xs text-slate-500">
                                Your latest assigned outage reports
                            </p>
                        </div>

                        <Link
                            href="/technician/outageAssignments"
                            className="inline-flex items-center gap-1 text-sm font-medium text-[#0055B8] hover:underline"
                        >
                            View all
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Mobile assignment cards */}
                    <div className="space-y-3 p-4 md:hidden">
                        {assignments.map((assignment) => (
                            <div
                                key={assignment.id}
                                className="rounded-xl border border-slate-100 p-4"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-slate-400">
                                            {assignment.id}
                                        </p>
                                        <h3 className="mt-1 text-sm font-semibold text-slate-800">
                                            {assignment.title}
                                        </h3>
                                    </div>
                                    <span
                                        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ring-1 ${getPriorityStyle(assignment.priority)}`}
                                    >
                                        {assignment.priority}
                                    </span>
                                </div>

                                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {assignment.area}
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-2">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(assignment.status)}`}
                                    >
                                        {formatStatus(assignment.status)}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {assignment.assignedAt}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop assignment table */}
                    <div className="hidden overflow-x-auto md:block">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/80">
                                    <th className="px-5 py-3 text-xs font-semibold text-slate-500">
                                        OUTAGE
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-500">
                                        PRIORITY
                                    </th>
                                    <th className="px-4 py-3 text-xs font-semibold text-slate-500">
                                        STATUS
                                    </th>
                                    <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500">
                                        ASSIGNED
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {assignments.map((assignment) => (
                                    <tr
                                        key={assignment.id}
                                        className="transition hover:bg-slate-50/70"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="text-xs font-medium text-slate-400">
                                                {assignment.id}
                                            </p>
                                            <p className="mt-1 whitespace-nowrap text-sm font-semibold text-slate-800">
                                                {assignment.title}
                                            </p>
                                            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                                <MapPin className="h-3 w-3" />
                                                {assignment.area}
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${getPriorityStyle(assignment.priority)}`}
                                            >
                                                {assignment.priority}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(assignment.status)}`}
                                            >
                                                {formatStatus(
                                                    assignment.status,
                                                )}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap px-5 py-4 text-right text-xs text-slate-500">
                                            {assignment.assignedAt}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-slate-100 px-5 py-4">
                        <p className="text-xs text-slate-500">
                            Showing {assignments.length} recent assignments
                        </p>
                    </div>
                </section>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Work Summary */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                                <Clock3 className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-slate-900">
                                    Work Summary
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    Your current workload
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 space-y-5">
                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm text-slate-600">
                                        Assigned
                                    </span>
                                    <span className="text-sm font-semibold text-slate-900">
                                        8 tasks
                                    </span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-full rounded-full bg-[#0055B8]" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm text-slate-600">
                                        In Progress
                                    </span>
                                    <span className="text-sm font-semibold text-orange-600">
                                        3 tasks
                                    </span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-[38%] rounded-full bg-orange-500" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm text-slate-600">
                                        Completed
                                    </span>
                                    <span className="text-sm font-semibold text-emerald-600">
                                        24 tasks
                                    </span>
                                </div>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full w-[80%] rounded-full bg-emerald-500" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-xl bg-slate-50 p-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-emerald-600" />
                                <p className="text-sm font-semibold text-slate-800">
                                    Keep up the good work!
                                </p>
                            </div>
                            <p className="mt-1.5 text-xs leading-5 text-slate-500">
                                Always update restoration records after
                                completing field work.
                            </p>
                        </div>
                    </section>

                    {/* Recent Activity */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-[#0055B8]" />
                                <h2 className="font-semibold text-slate-900">
                                    Recent Activity
                                </h2>
                            </div>
                            <Bell className="h-4 w-4 text-slate-400" />
                        </div>

                        <div className="mt-5 space-y-5">
                            {activities.map((activity, index) => {
                                const Icon = activity.icon;

                                return (
                                    <div
                                        key={activity.title}
                                        className="relative flex gap-3"
                                    >
                                        {index !== activities.length - 1 && (
                                            <div className="absolute -bottom-5 left-5 top-11 w-px bg-slate-100" />
                                        )}

                                        <div
                                            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.color}`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        <div className="min-w-0 flex-1 pt-0.5">
                                            <p className="text-sm font-medium text-slate-800">
                                                {activity.title}
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                {activity.description}
                                            </p>
                                            <p className="mt-2 text-[11px] text-slate-400">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href="/technician/outageReports"
                            className="mt-5 flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#0055B8]"
                        >
                            View activity
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </section>
                </div>
            </div>

            {/* Bottom Safety Reminder */}
            <div className="flex flex-col gap-3 rounded-2xl border border-amber-100 bg-amber-50/70 p-4 sm:flex-row sm:items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                        Safety comes first
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                        Follow electrical safety procedures, use protective
                        equipment, and record all restoration activities
                        accurately.
                    </p>
                </div>

                <Link
                    href="/technician/restorations"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-amber-800 hover:underline"
                >
                    Restoration records
                    <ArrowDownRight className="h-4 w-4" />
                </Link>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <p>
                    GridCare Technician Portal · Employee ID:{' '}
                    {technician.employeeId}
                </p>
                <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Field operations dashboard
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboard;
