import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    applyAsTechnician,
    approveTechnician,
    getAllPublicTechnicians,
    getAllTechnicians,
    verifyTechnicianAccount,
} from '@/api/technician.api';

import { PublicTechnicianParams, TechnicianParams } from '@/interface';

export function useApplyAsTechnician() {
    return useMutation({
        mutationFn: applyAsTechnician,
    });
}

export function useVerifyTechnicianAccount() {
    return useMutation({
        mutationFn: verifyTechnicianAccount,
    });
}

export function useGetAllTechnicians(params: TechnicianParams) {
    return useQuery({
        queryKey: ['Technicians', params],
        queryFn: () => getAllTechnicians(params),
    });
}

export function useSuspenseGetAllTechnicians(params: TechnicianParams) {
    return useSuspenseQuery({
        queryKey: ['doctors', params],
        queryFn: () => getAllTechnicians(params),
    });
}

export function useApproveTechnician() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveTechnician,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['Technicians'] });
        },
    });
}

export function useGetAllPublicTechnicians(params: PublicTechnicianParams) {
    return useQuery({
        queryKey: ['doctor', 'public', params],
        queryFn: () => getAllPublicTechnicians(params),
    });
}

export function useSuspenseGetPublicDoctors(params: PublicTechnicianParams) {
    return useSuspenseQuery({
        queryKey: ['doctors', 'public', params],
        queryFn: () => getAllPublicTechnicians(params),
    });
}

// export function usePublicDoctorProfile(doctorId: string) {
//     return useQuery({
//         queryKey: ['doctor', 'public', doctorId],
//         queryFn: () => getPublicTechnicianProfile(doctorId),
//         enabled: !!doctorId,
//     });
// }

// export function useGetTodayScheduleByTechnician(params: {
//     doctorId?: string;
//     page?: number;
//     limit?: number;
// }) {
//     return useQuery({
//         queryKey: ['schedule', params],
//         queryFn: () => getTodayScheduleByTechnician(params),
//     });
// }
