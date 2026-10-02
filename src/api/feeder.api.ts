import { FeederParams, ICreateFeeder, SingleFeederResponse } from '@/interface';
import apiClient from '@/lib/apiClient';

export function createFeeder(payload: ICreateFeeder) {
    return apiClient<SingleFeederResponse>('/feeders', {
        method: 'POST',
        body: payload,
    });
}

export function getAllFeeders(params: FeederParams) {
    return apiClient('/feeders', { params });
}

export function updateFeeder(id: string, payload: Omit<ICreateFeeder, 'id'>) {
    return apiClient<SingleFeederResponse>(`/feeders/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteFeeder(id: string) {
    return apiClient<SingleFeederResponse>(`/feeders/${id}`, {
        method: 'DELETE',
    });
}
