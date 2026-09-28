import { ApiResponse, ICredentialVerifyOTP } from '@/interface';
import {
    ApproveTechnicianPayload,
    PublicTechnicianParams,
    PublicTechnicianProfile,
    Technician,
    TechnicianApplicationPayload,
    TechnicianParams,
} from '@/interface/technician.interface';
import apiClient from '@/lib/apiClient';

export function applyAsTechnician(payload: TechnicianApplicationPayload) {
    const formData = new FormData();

    formData.append('data', JSON.stringify(payload.data));
    formData.append('resume', payload.resume);

    for (const file of payload.additionalFiles) {
        formData.append('additionalFiles', file);
    }

    return apiClient('/technician/apply-as-technician', {
        method: 'POST',
        body: formData,
    });
}

export function verifyTechnicianAccount(payload: ICredentialVerifyOTP) {
    return apiClient('/technician/apply-as-technician/verify-email', {
        method: 'POST',
        body: payload,
    });
}

export function getAllTechnicians(params: TechnicianParams) {
    return apiClient<ApiResponse<Technician[]>>('/technician/all-technicians', {
        params,
    });
}

export function approveTechnician(payload: ApproveTechnicianPayload) {
    return apiClient('/technician/approve-technician', {
        method: 'POST',
        body: payload,
    });
}

export function getAllPublicTechnicians(params: PublicTechnicianParams) {
    return apiClient<ApiResponse<PublicTechnicianProfile[]>>(
        '/technician/public/all-technicians',
        {
            params,
        },
    );
}
