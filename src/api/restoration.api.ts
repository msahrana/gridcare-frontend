import {
    ICreateRestoration,
    IRestorationResponse,
    IUpdateRestoration,
    RestorationsParams,
    SingleRestorationResponse,
} from '@/interface';

import apiClient from '@/lib/apiClient';

/* =========================
   Start Restoration
========================= */

export function startRestoration(payload: ICreateRestoration) {
    return apiClient<SingleRestorationResponse>('/restorations/start', {
        method: 'POST',
        body: payload,
    });
}

/* =========================
   Get All Restorations
========================= */

export function getAllRestorations(params: RestorationsParams) {
    return apiClient<IRestorationResponse>('/restorations', {
        params,
    });
}

/* =========================
   Get Single Restoration
========================= */

export function getRestorationById(id: string) {
    return apiClient<SingleRestorationResponse>(`/restorations/${id}`, {
        method: 'GET',
    });
}

/* =========================
   Complete Restoration
========================= */

export function completedRestoration(
    id: string,
    payload?: Omit<IUpdateRestoration, 'id'>,
) {
    return apiClient<SingleRestorationResponse>(
        `/restorations/${id}/complete`,
        {
            method: 'PATCH',
            body: payload,
        },
    );
}

/* =========================
   Cancel Restoration
========================= */

export function cancelRestoration(
    id: string,
    payload?: Omit<IUpdateRestoration, 'id'>,
) {
    return apiClient<SingleRestorationResponse>(`/restorations/${id}/cancel`, {
        method: 'PATCH',
        body: payload,
    });
}

/* =========================
   Delete Restoration
========================= */

export function deleteRestoration(id: string) {
    return apiClient<SingleRestorationResponse>(`/restorations/${id}`, {
        method: 'DELETE',
    });
}
