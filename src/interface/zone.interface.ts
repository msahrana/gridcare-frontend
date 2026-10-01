export interface ICreateZone {
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

export interface ZoneResponse {
    success: boolean;
    message: string;
    data: IZone[];
}
