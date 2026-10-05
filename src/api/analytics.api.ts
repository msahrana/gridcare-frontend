import {
    IAnalyticsOverviewResponse,
    IOutageAnalyticsResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

export const getAnalyticsOverview =
    async (): Promise<IAnalyticsOverviewResponse> => {
        return apiClient('/analytics/overview', {
            method: 'GET',
        });
    };

export const getOutageAnalytics =
    async (): Promise<IOutageAnalyticsResponse> => {
        return apiClient('/analytics/outages', {
            method: 'GET',
        });
    };
