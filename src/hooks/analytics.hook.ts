import { useQuery } from '@tanstack/react-query';
import { getAnalyticsOverview, getOutageAnalytics } from '@/api';

export const useAnalyticsOverview = () => {
    return useQuery({
        queryKey: ['analytics-overview'],
        queryFn: getAnalyticsOverview,
    });
};

export const useOutageAnalytics = () => {
    return useQuery({
        queryKey: ['outage-analytics'],
        queryFn: getOutageAnalytics,
    });
};
