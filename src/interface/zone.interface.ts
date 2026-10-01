export interface ICreateZone {
    name: string;
    code: string;
    description?: string;
}

export interface IUpdateZone {
    id: string;
    name: string;
    code: string;
    description?: string;
}

export interface IZone {
    id: string;
    name: string;
    code: string;
    description?: string;
    isActive: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IZoneMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ZoneResponse {
    success: boolean;
    message: string;
    data: IZone[];
    meta: IZoneMeta;
}

export interface SingleZoneResponse {
    success: boolean;
    message: string;
    data: IZone;
}

export interface DeleteZoneResponse {
    success: boolean;
    message: string;
    data: null;
}

export interface ZoneParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortOrder?: 'desc' | 'asc';
}
