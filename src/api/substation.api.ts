import {
    ICreateSubstation,
    ISubstationResponse,
    IUpdateSubstation,
    SubstationParams,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createSubstation(payload: ICreateSubstation) {
    return apiClient<ISubstationResponse>('/substations', {
        method: 'POST',
        body: payload,
    });
}

export function getAllSubstations(params: SubstationParams) {
    return apiClient<ISubstationResponse>('/substations', {
        params,
    });
}

export function updateSubstation(
    id: string,
    payload: Omit<IUpdateSubstation, 'id'>,
) {
    return apiClient<ISubstationResponse>(`/substations/${id}`, {
        method: 'PATCH',
        body: payload,
    });
}

export function deleteSubstation(id: string) {
    return apiClient<{ success: boolean; message: string; data: null }>(
        `/substations/${id}`,
        {
            method: 'DELETE',
        },
    );
}
