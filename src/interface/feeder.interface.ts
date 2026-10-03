import { FeederStatus } from '@/types';

export interface ICreateFeeder {
    name: string;
    code: string;
    substationId: string;
    status?: FeederStatus;
}

export interface IUpdateFeeder {
    id: string;
    name: string;
    code: string;
    substationId: string;
    status?: FeederStatus;
}

export interface IFeeder {
    id: string;
    name: string;
    code: string;
    substationId: string;
    status: FeederStatus;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;

    substation: {
        id: string;
        name: string;
        code: string;
        zoneId: string;
        capacity: number;
        isActive: boolean;
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IFeederMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IFeederResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        data: IFeeder[];
        meta: IFeederMeta;
    };
}

export interface SingleFeederResponse {
    success: boolean;
    message: string;
    data: IFeeder;
}

export interface FeederParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface FeederFormValues {
    name: string;
    code: string;
    substationId: string;
    status: FeederStatus;
}
