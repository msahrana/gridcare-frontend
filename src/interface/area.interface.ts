export interface ICreateArea {
    name: string;
    code: string;
    zoneId: string;
    substationId: string;
    feederId: string;
    address: string;
    latitude: number;
    longitude: number;
    isActive?: boolean;
}

export interface IUpdateArea {
    id: string;
    name: string;
    code: string;
    zoneId: string;
    substationId: string;
    feederId: string;
    address: string;
    latitude: number;
    longitude: number;
    isActive?: boolean;
}

export interface IArea {
    id: string;
    name: string;
    code: string;
    zoneId: string;
    substationId: string;
    feederId: string;
    address: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;

    zone: {
        id: string;
        name: string;
        code: string;
        description: string;
        isActive: boolean;
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
    };

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

    feeder: {
        id: string;
        name: string;
        code: string;
        substationId: string;
        status: string;
        deletedAt: string | null;
        createdAt: string;
        updatedAt: string;
    };
}

export interface IAreaMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IAreaResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: IArea[];
    meta: IAreaMeta;
}

export interface SingleAreaResponse {
    success: boolean;
    message: string;
    data: IArea;
}

export interface AreaParams {
    page?: number;
    limit?: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IAreaFormValues {
    name: string;
    code: string;
    zoneId: string;
    substationId: string;
    feederId: string;
    address: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
}

export interface SingleAreaResponse {
    success: boolean;
    message: string;
    data: IArea;
}

export interface AreaFormValues {
    name: string;
    code: string;
    zoneId: string;
    substationId: string;
    feederId: string;
    address: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
}
