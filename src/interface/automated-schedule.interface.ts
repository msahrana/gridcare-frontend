import { ScheduleStatus } from '@/types';

export interface ICreateAutomatedSchedule {
    areaIds: string[];
    date: string;
    startTime: string;
    endTime: string;
    title: string;
    description: string;
}

export interface IUpdateAutomatedSchedule {
    id: string;
    areaId?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    title?: string;
    description?: string;
    status?: ScheduleStatus;
}

export interface IAutomatedScheduleArea {
    id: string;
    name: string;
    code: string;
}

export interface IAutomatedSchedule {
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
    area: IAutomatedScheduleArea;
}

export interface IAutomatedScheduleMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IAutomatedScheduleListData {
    data: IAutomatedSchedule[];
    meta: IAutomatedScheduleMeta;
}

export interface IAutomatedScheduleResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IAutomatedScheduleListData;
}

export interface SingleAutomatedScheduleResponse {
    success: boolean;
    statusCode?: number;
    message: string;
    data: IAutomatedSchedule;
}

export interface AutomatedScheduleParams {
    page?: number;
    limit?: number;
    areaId?: string;
    status?: ScheduleStatus;
    startDate?: string;
    endDate?: string;
}
