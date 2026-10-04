import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    createNotification,
    deleteNotification,
    getAllNotifications,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from '@/api';

import { INotificationResponse, NotificationsParams } from '@/interface';

export function useCreateNotification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNotification,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notifications'],
            });
        },
    });
}

export function useGetAllNotifications(params: NotificationsParams) {
    return useQuery<INotificationResponse>({
        queryKey: ['notifications', params],
        queryFn: () => getAllNotifications(params),
    });
}

export function useSuspenseGetAllNotifications(params: NotificationsParams) {
    return useSuspenseQuery<INotificationResponse>({
        queryKey: ['notifications', params],
        queryFn: () => getAllNotifications(params),
    });
}

/**
 * Mark one notification as read
 */
export function useUpdateNotification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => markNotificationAsRead(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notifications'],
            });
        },
    });
}

/**
 * Mark all notifications as read
 */
export function useMarkAllNotificationsAsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => markAllNotificationsAsRead(),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notifications'],
            });
        },
    });
}

export function useDeleteNotification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteNotification(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notifications'],
            });
        },
    });
}
