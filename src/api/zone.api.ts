import { ICreateZone } from '@/interface';
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
