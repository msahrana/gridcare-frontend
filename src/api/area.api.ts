import {
    AreaParams,
    IAreaResponse,
    ICreateArea,
    IUpdateArea,
    SingleAreaResponse,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createArea(payload: ICreateArea) {
    return apiClient<SingleAreaResponse>('/areas', {
        method: 'POST',
        body: payload,
    });
}

export function getAllAreas(params: AreaParams) {
    return apiClient<IAreaResponse>('/areas', { params });
}

export function updateArea(id: string, payload: Omit<IUpdateArea, 'id'>) {
    return apiClient<SingleAreaResponse>(`/areas/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteArea(id: string) {
    return apiClient<SingleAreaResponse>(`/areas/${id}`, {
        method: 'DELETE',
    });
}
