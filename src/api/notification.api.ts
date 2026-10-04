import {
    ICreateNotification,
    INotificationResponse,
    NotificationsParams,
    SingleNotificationResponse,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createNotification(payload: ICreateNotification) {
    return apiClient<SingleNotificationResponse>('/notifications', {
        method: 'POST',
        body: payload,
    });
}

export function getAllNotifications(params: NotificationsParams) {
    return apiClient<INotificationResponse>('/notifications', {
        params,
    });
}

export const markNotificationAsRead = async (id: string) => {
    return apiClient<SingleNotificationResponse>(`/notifications/${id}/read`, {
        method: 'PATCH',
    });
};

export const markAllNotificationsAsRead = async () => {
    return apiClient('/notifications/my/read-all', {
        method: 'PATCH',
    });
};

export function deleteNotification(id: string) {
    return apiClient<SingleNotificationResponse>(`/notifications/${id}`, {
        method: 'DELETE',
    });
}
