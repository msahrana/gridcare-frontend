import { IZone } from './zone.interface';

export interface ICreateSubstation {
    name: string;
    code: string;
    zoneId: string;
    capacity: number;
}

export interface IUpdateSubstation {
    id: string;
    name: string;
    code: string;
    zoneId: string;
    capacity: number;
    isActive?: boolean;
}

export interface ISubstation {
    id: string;
    name: string;
    code: string;
    zoneId: string;
    capacity: number;
    isActive: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    zone: IZone;
}

export interface ISubstationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ISubstationResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ISubstation[];
    meta: ISubstationMeta;
}

export interface SubstationParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortOrder?: 'desc' | 'asc';
}

export interface SubstationFormValues {
    name: string;
    code: string;
    zoneId: string;
    capacity: string;
}
