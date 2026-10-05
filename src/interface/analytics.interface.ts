export interface IAnalyticsOverview {
    totalOutages: number;
    activeOutages: number;
    restoredOutages: number;
    plannedOutages: number;
    unexpectedOutages: number;
    criticalOutages: number;
    totalRestorations: number;
    completedRestorations: number;
    totalDowntimeMinutes: number;
    averageRestorationMinutes: number;
}

export interface IOutageAnalyticsByType {
    type: 'PLANNED' | 'UNEXPECTED';
    count: number;
}

export interface IOutageAnalyticsByPriority {
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    count: number;
}

export interface IOutageAnalyticsByStatus {
    status:
        | 'REPORTED'
        | 'VERIFIED'
        | 'ASSIGNED'
        | 'IN_PROGRESS'
        | 'RESTORED'
        | 'CLOSED'
        | 'CANCELLED';
    count: number;
}

export interface IOutageAnalytics {
    byType: IOutageAnalyticsByType[];
    byPriority: IOutageAnalyticsByPriority[];
    byStatus: IOutageAnalyticsByStatus[];
}

export interface IAnalyticsOverviewResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IAnalyticsOverview;
}

export interface IOutageAnalyticsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IOutageAnalytics;
}
