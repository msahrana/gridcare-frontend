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

    return apiClient('/technicians/apply-as-technician', {
        method: 'POST',
        body: formData,
    });
}

export function verifyTechnicianAccount(payload: ICredentialVerifyOTP) {
    return apiClient('/technicians/apply-as-technician/verify-email', {
        method: 'POST',
        body: payload,
    });
}

export function getAllTechnicians(params: TechnicianParams) {
    return apiClient<ApiResponse<Technician[]>>(
        '/technicians/all-technicians',
        {
            params,
        },
    );
}

export function approveTechnician(payload: ApproveTechnicianPayload) {
    return apiClient('/technicians/approve-technician', {
        method: 'POST',
        body: payload,
    });
}

export function getAllPublicTechnicians(params: PublicTechnicianParams) {
    return apiClient<ApiResponse<PublicTechnicianProfile[]>>(
        '/technicians/public/all-technicians',
        {
            params,
        },
    );
}
