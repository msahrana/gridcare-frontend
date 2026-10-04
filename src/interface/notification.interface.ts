import { UserRole } from '@/types';

export interface ICreateNotification {
    userId: string;
    title: string;
    message: string;
}

export interface IUpdateNotification {
    id: string;
    isRead: boolean;
}

export interface INotificationUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface INotification {
    id: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    user: INotificationUser;
}

export interface INotificationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface INotificationListData {
    data: INotification[];
    meta: INotificationMeta;
}

export interface INotificationResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: INotificationListData;
}

export interface SingleNotificationResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data: INotification;
}

export interface NotificationsParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
}
