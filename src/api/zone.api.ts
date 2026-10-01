import { ICreateZone, SingleZoneResponse } from '@/interface';
import apiClient from '@/lib/apiClient';

export function createZone(payload: ICreateZone) {
    return apiClient('/zones', {
        method: 'POST',
        body: payload,
    });
}

export function getAllZones() {
    return apiClient('/zones');
}

export function updateZone(id: string, payload: Omit<ICreateZone, 'id'>) {
    return apiClient<SingleZoneResponse>(`/zones/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteZone(id: string) {
    return apiClient<{ success: boolean; message: string; data: null }>(
        `/zones/${id}`,
        { method: 'DELETE' },
    );
}
