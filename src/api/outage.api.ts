import {
    ICreateOutage,
    IOutagesResponse,
    IUpdateOutage,
    OutagesParams,
    SingleOutageResponse,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createOutage(payload: ICreateOutage) {
    return apiClient<SingleOutageResponse>('/outages', {
        method: 'POST',
        body: payload,
    });
}

export function getAllOutages(params: OutagesParams) {
    return apiClient<IOutagesResponse>('/outages', { params });
}

export function updateOutage(id: string, payload: Omit<IUpdateOutage, 'id'>) {
    return apiClient<SingleOutageResponse>(`/outages/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteOutage(id: string) {
    return apiClient<SingleOutageResponse>(`/outages/${id}`, {
        method: 'DELETE',
    });
}
