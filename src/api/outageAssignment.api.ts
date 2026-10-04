import {
    ICreateOutageAssignment,
    IOutageAssignmentResponse,
    IUpdateOutageAssignment,
    OutageAssignmentParams,
    SingleOutageAssignmentResponse,
} from '@/interface';
import apiClient from '@/lib/apiClient';

export function createOutageAssignment(payload: ICreateOutageAssignment) {
    return apiClient<SingleOutageAssignmentResponse>('/outageAssignments', {
        method: 'POST',
        body: payload,
    });
}

export function getAllOutageAssignments(params: OutageAssignmentParams) {
    return apiClient<IOutageAssignmentResponse>('/outageAssignments', {
        params,
    });
}

export function updateOutageAssignment(
    id: string,
    payload: Omit<IUpdateOutageAssignment, 'id'>,
) {
    return apiClient<SingleOutageAssignmentResponse>(
        `/outageAssignments/${id}`,
        {
            method: 'PATCH',
            body: payload,
        },
    );
}

export function deleteOutageAssignment(id: string) {
    return apiClient<SingleOutageAssignmentResponse>(
        `/outageAssignments/${id}`,
        {
            method: 'DELETE',
        },
    );
}
