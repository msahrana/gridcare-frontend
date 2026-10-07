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
    CheckCircle,
    Clock,
    GitBranch,
    MapPin,
    Building2,
    Users,
    Wrench,
    Zap,
    MapIcon,
} from 'lucide-react';

const AdminDashboard = () => {
    const { data: overviewResponse } = useAnalyticsOverview();
    const overview = overviewResponse?.data;

    const params = {
        page: 1,
        limit: 20,
    };

    // Users
    const { data: usersResponse } = useSuspenseGetAllUsers();
    const users = usersResponse?.data ?? [];

    // Zones
    const { data: zoneResponse } = useSuspenseGetAllZones(params);
    const zone = zoneResponse?.data;
    const totalZones = zone?.meta?.total ?? 0;

    // Substations
    const { data: substationResponse } = useSuspenseGetAllSubstations(params);
    const substations = substationResponse?.data ?? [];
    const totalSubstations = substations.length;

    // Feeders
    const { data: feederResponse } = useSuspenseGetAllFeeders(params);
    const feeder = feederResponse?.data;
    const totalFeeders = feeder?.meta?.total ?? 0;

    // Areas
    const { data: areaResponse } = useSuspenseGetAllAreas(params);
    const areas = areaResponse?.data ?? [];
    const totalAreas = areas.length;

    // const analytics = {
    //     totalOutages: 18,
    //     activeOutages: 7,
    //     restoredOutages: 1,
    //     plannedOutages: 2,
    //     unexpectedOutages: 6,
    //     criticalOutages: 4,
    //     totalRestorations: 2,
    //     completedRestorations: 1,
    // };

    const summaryCards = [
        {
            title: 'Total Outages',
            // value: analytics.totalOutages,
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
            value: overview?.restoredOutages,
            icon: CheckCircle,
        },
        {
            title: 'Critical Outages',
            value: overview?.criticalOutages,
            icon: AlertTriangle,
        },
        {
            title: 'Planned Outages',
            value: overview?.plannedOutages,
            icon: Clock,
        },
        {
            title: 'Unexpected Outages',
            value: overview?.unexpectedOutages,
            icon: Zap,
        },
        {
            title: 'Total Restorations',
            value: overview?.totalRestorations,
            icon: Wrench,
        },
        {
            title: 'Completed Restorations',
            value: overview?.completedRestorations,
            icon: CheckCircle,
        },
    ];

    const systemCards = [
        {
            title: 'Total Users',
            value: users.length,
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
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Admin Dashboard
                </h1>

                <p className="text-muted-foreground">
                    Monitor GridCare operations, outages and restoration
                    activities.
                </p>
            </div>

            {/* Operational Summary */}
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

            {/* Infrastructure Summary */}
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
