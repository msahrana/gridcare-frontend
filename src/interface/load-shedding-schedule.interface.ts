import { ScheduleStatus } from '@/types';

export interface ICreateLoadSheddingSchedule {
    areaId: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
}

export interface IUpdateLoadSheddingSchedule {
    id: string;
    description?: string;
}

export interface ILoadSheddingScheduleArea {
    id: string;
    name: string;
    code: string;

    zoneId: string;
    substationId: string;
    feederId: string;

    address: string;
    latitude: number | null;
    longitude: number | null;

    isActive: boolean;

    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ILoadSheddingSchedule {
    id: string;
    areaId: string;

    title: string;
    description: string;

    startTime: string;
    endTime: string;

    status: ScheduleStatus;

    createdById: string;

    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    area: ILoadSheddingScheduleArea;
}

export interface ILoadSheddingScheduleMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ILoadSheddingScheduleListData {
    data: ILoadSheddingSchedule[];
    meta: ILoadSheddingScheduleMeta;
}

export interface ILoadSheddingScheduleResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ILoadSheddingScheduleListData;
}

export interface SingleLoadSheddingScheduleResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data: ILoadSheddingSchedule;
}

export interface LoadSheddingScheduleParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    areaId?: string;
    status?: ScheduleStatus;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IUpcomingLoadSheddingScheduleResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ILoadSheddingSchedule[];
}
