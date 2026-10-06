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
    // Replace this with your analytics API data
    const analytics = {
        totalOutages: 8,
        activeOutages: 7,
        restoredOutages: 1,
        plannedOutages: 2,
        unexpectedOutages: 6,
        criticalOutages: 4,
        totalRestorations: 2,
        completedRestorations: 1,
    };

    const summaryCards = [
        {
            title: 'Total Outages',
            value: analytics.totalOutages,
            icon: Zap,
        },
        {
            title: 'Active Outages',
            value: analytics.activeOutages,
            icon: AlertTriangle,
        },
        {
            title: 'Restored Outages',
            value: analytics.restoredOutages,
            icon: CheckCircle,
        },
        {
            title: 'Critical Outages',
            value: analytics.criticalOutages,
            icon: AlertTriangle,
        },
        {
            title: 'Planned Outages',
            value: analytics.plannedOutages,
            icon: Clock,
        },
        {
            title: 'Unexpected Outages',
            value: analytics.unexpectedOutages,
            icon: Zap,
        },
        {
            title: 'Total Restorations',
            value: analytics.totalRestorations,
            icon: Wrench,
        },
        {
            title: 'Completed Restorations',
            value: analytics.completedRestorations,
            icon: CheckCircle,
        },
    ];

    const systemCards = [
        {
            title: 'Total Users',
            value: 0,
            icon: Users,
        },
        {
            title: 'Total Zones',
            value: 0,
            icon: MapIcon,
        },
        {
            title: 'Total Substations',
            value: 0,
            icon: Building2,
        },
        {
            title: 'Total Feeders',
            value: 0,
            icon: GitBranch,
        },
        {
            title: 'Total Areas',
            value: 0,
            icon: MapPin,
        },
    ];

    return (
        <div className="space-y-8 ml-5 mt-6">
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
