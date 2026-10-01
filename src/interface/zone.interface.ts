export interface ICreateZone {
    name: string;
    code: string;
    description?: string;
}

export interface IUpdateZone {
    id: string;
    name: string;
    code: string;
    description: string | undefined;
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

export interface ZoneResponse {
    success: boolean;
    message: string;
    data: IZone[];
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
