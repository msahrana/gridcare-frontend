export interface ICreateZone {
    id: string;
    name: string;
    code: string;
    description: string;
    isActive: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface ZoneResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ICreateZone[];
}
