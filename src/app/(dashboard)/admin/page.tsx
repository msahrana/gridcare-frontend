'use client';

import {
    useAnalyticsOverview,
    useSuspenseGetAllAreas,
    useSuspenseGetAllFeeders,
    useSuspenseGetAllSubstations,
    useSuspenseGetAllUsers,
    useSuspenseGetAllZones,
} from '@/hooks';

import {
    AlertTriangle,
    Building2,
    CheckCircle,
    Clock,
    GitBranch,
    MapIcon,
    MapPin,
    Users,
    Wrench,
    Zap,
} from 'lucide-react';

const AdminDashboard = () => {
    // =========================
    // Analytics Overview
    // =========================

    const { data: overviewResponse } = useAnalyticsOverview();

    const overview = overviewResponse?.data;

    // =========================
    // Dashboard Params
    // =========================
    // Dashboard-এ pagination দেখানো হচ্ছে না।
    // তাই প্রথম page থেকে বড় সংখ্যক data fetch করছি।

    const params = {
        page: 1,
        limit: 1000,
    };

    // =========================
    // Users
    // =========================

    const { data: usersResponse } = useSuspenseGetAllUsers();

    const totalUsers = usersResponse?.data?.length ?? 0;

    // =========================
    // Zones
    // =========================

    const { data: zoneResponse } = useSuspenseGetAllZones(params);

    const zones = zoneResponse?.data;

    const totalZones = zones?.meta?.total ?? 0;

    // =========================
    // Substations
    // =========================

    const { data: substationResponse } = useSuspenseGetAllSubstations(params);

    const totalSubstations = substationResponse?.data?.length ?? 0;

    // =========================
    // Feeders
    // =========================

    const { data: feederResponse } = useSuspenseGetAllFeeders(params);

    const feeders = feederResponse?.data;

    const totalFeeders = feeders?.meta?.total ?? 0;

    // =========================
    // Areas
    // =========================

    const { data: areaResponse } = useSuspenseGetAllAreas(params);

    const totalAreas = areaResponse?.data?.length ?? 0;

    // =========================
    // Operational Summary Cards
    // =========================

    const summaryCards = [
        {
            title: 'Total Outages',
            value: overview?.totalOutages ?? 0,
            icon: Zap,
        },
        {
            title: 'Active Outages',
            value: overview?.activeOutages ?? 0,
            icon: AlertTriangle,
        },
        {
            title: 'Restored Outages',
            value: overview?.restoredOutages ?? 0,
            icon: CheckCircle,
        },
        {
            title: 'Critical Outages',
            value: overview?.criticalOutages ?? 0,
            icon: AlertTriangle,
        },
        {
            title: 'Planned Outages',
            value: overview?.plannedOutages ?? 0,
            icon: Clock,
        },
        {
            title: 'Unexpected Outages',
            value: overview?.unexpectedOutages ?? 0,
            icon: Zap,
        },
        {
            title: 'Total Restorations',
            value: overview?.totalRestorations ?? 0,
            icon: Wrench,
        },
        {
            title: 'Completed Restorations',
            value: overview?.completedRestorations ?? 0,
            icon: CheckCircle,
        },
    ];

    // =========================
    // Infrastructure Summary Cards
    // =========================

    const systemCards = [
        {
            title: 'Total Users',
            value: totalUsers,
            icon: Users,
        },
        {
            title: 'Total Zones',
            value: totalZones,
            icon: MapIcon,
        },
        {
            title: 'Total Substations',
            value: totalSubstations,
            icon: Building2,
        },
        {
            title: 'Total Feeders',
            value: totalFeeders,
            icon: GitBranch,
        },
        {
            title: 'Total Areas',
            value: totalAreas,
            icon: MapPin,
        },
    ];

    return (
        <div className="ml-5 mt-6 space-y-8">
            {/* =========================
                Header
            ========================= */}

            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Admin Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Monitor GridCare operations, outages and restoration
                    activities.
                </p>
            </div>

            {/* =========================
                Operational Summary
            ========================= */}

            <section className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Operational Summary
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Current outage and restoration overview.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {summaryCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-xl border bg-card p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </p>

                                    <Icon className="size-5 text-muted-foreground" />
                                </div>

                                <p className="mt-3 text-3xl font-bold">
                                    {card.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* =========================
                Infrastructure Summary
            ========================= */}

            <section className="space-y-4">
                <div>
                    <h2 className="text-lg font-semibold">
                        Infrastructure Summary
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Overview of the GridCare electrical hierarchy.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {systemCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-xl border bg-card p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </p>

                                    <Icon className="size-5 text-muted-foreground" />
                                </div>

                                <p className="mt-3 text-2xl font-bold">
                                    {card.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
