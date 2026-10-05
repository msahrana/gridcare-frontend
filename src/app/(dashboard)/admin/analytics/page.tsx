'use client';

import {
    Activity,
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Clock,
    Power,
    Timer,
    TrendingDown,
    Zap,
} from 'lucide-react';

import { useAnalyticsOverview, useOutageAnalytics } from '@/hooks';

const Analytics = () => {
    const { data: overviewResponse, isLoading: overviewLoading } =
        useAnalyticsOverview();

    const { data: outageResponse, isLoading: outageLoading } =
        useOutageAnalytics();

    const overview = overviewResponse?.data;
    const outageAnalytics = outageResponse?.data;

    if (overviewLoading || outageLoading) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <div className="text-muted-foreground">
                    Loading analytics...
                </div>
            </div>
        );
    }

    if (!overview || !outageAnalytics) {
        return (
            <div className="flex min-h-100 items-center justify-center">
                <div className="text-muted-foreground">
                    No analytics data available.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>

                <p className="text-sm text-muted-foreground">
                    Overview of outages, restorations and system performance
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <AnalyticsCard
                    title="Total Outages"
                    value={overview.totalOutages}
                    icon={<Zap className="h-5 w-5" />}
                />

                <AnalyticsCard
                    title="Active Outages"
                    value={overview.activeOutages}
                    icon={<Activity className="h-5 w-5" />}
                />

                <AnalyticsCard
                    title="Restored"
                    value={overview.restoredOutages}
                    icon={<CheckCircle2 className="h-5 w-5" />}
                />

                <AnalyticsCard
                    title="Planned"
                    value={overview.plannedOutages}
                    icon={<Power className="h-5 w-5" />}
                />

                <AnalyticsCard
                    title="Unexpected"
                    value={overview.unexpectedOutages}
                    icon={<AlertCircle className="h-5 w-5" />}
                />

                <AnalyticsCard
                    title="Critical"
                    value={overview.criticalOutages}
                    icon={<AlertTriangle className="h-5 w-5" />}
                />
            </div>

            {/* Restoration Statistics */}
            <div>
                <h2 className="mb-4 text-lg font-semibold">
                    Restoration Statistics
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <AnalyticsCard
                        title="Total Restorations"
                        value={overview.totalRestorations}
                        icon={<TrendingDown className="h-5 w-5" />}
                    />

                    <AnalyticsCard
                        title="Completed Restorations"
                        value={overview.completedRestorations}
                        icon={<CheckCircle2 className="h-5 w-5" />}
                    />

                    <AnalyticsCard
                        title="Total Downtime"
                        value={`${overview.totalDowntimeMinutes} min`}
                        icon={<Clock className="h-5 w-5" />}
                    />

                    <AnalyticsCard
                        title="Avg. Restoration"
                        value={`${overview.averageRestorationMinutes} min`}
                        icon={<Timer className="h-5 w-5" />}
                    />
                </div>
            </div>

            {/* Analytics Details */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* By Type */}
                <AnalyticsSection title="Outages by Type">
                    {outageAnalytics.byType.map((item) => (
                        <AnalyticsRow
                            key={item.type}
                            label={formatLabel(item.type)}
                            value={item.count}
                        />
                    ))}
                </AnalyticsSection>

                {/* By Priority */}
                <AnalyticsSection title="Outages by Priority">
                    {outageAnalytics.byPriority.map((item) => (
                        <AnalyticsRow
                            key={item.priority}
                            label={formatLabel(item.priority)}
                            value={item.count}
                        />
                    ))}
                </AnalyticsSection>

                {/* By Status */}
                <AnalyticsSection title="Outages by Status">
                    {outageAnalytics.byStatus.map((item) => (
                        <AnalyticsRow
                            key={item.status}
                            label={formatLabel(item.status)}
                            value={item.count}
                        />
                    ))}
                </AnalyticsSection>
            </div>
        </div>
    );
};

const AnalyticsCard = ({
    title,
    value,
    icon,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}) => {
    return (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                    {title}
                </p>

                <div className="rounded-lg bg-muted p-2">{icon}</div>
            </div>

            <div className="mt-3">
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
};

const AnalyticsSection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 font-semibold">{title}</h3>

            <div className="space-y-4">{children}</div>
        </div>
    );
};

const AnalyticsRow = ({ label, value }: { label: string; value: number }) => {
    return (
        <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{label}</span>

            <span className="font-semibold">{value}</span>
        </div>
    );
};

const formatLabel = (value: string) => {
    return value
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default Analytics;
