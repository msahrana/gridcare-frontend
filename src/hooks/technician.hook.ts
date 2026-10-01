import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    applyAsTechnician,
    approveTechnician,
    getAllTechnicians,
    verifyTechnicianAccount,
} from '@/api';
import { TechnicianParams } from '@/interface';

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
        queryKey: ['technicians', params],
        queryFn: () => getAllTechnicians(params),
    });
}

export function useSuspenseGetAllTechnicians(params: TechnicianParams) {
    return useSuspenseQuery({
        queryKey: ['technicians', params],
        queryFn: () => getAllTechnicians(params),
    });
}

export function useApproveTechnician() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveTechnician,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['technicians'],
            });
        },
    });
}

// export function useGetAllPublicTechnicians(params: PublicTechnicianParams) {
//     return useQuery({
//         queryKey: ['technician', 'public', params],
//         queryFn: () => getAllPublicTechnicians(params),
//     });
// }

// export function useSuspenseGetPublictechnicians(
//     params: PublicTechnicianParams,
// ) {
//     return useSuspenseQuery({
//         queryKey: ['technicians', 'public', params],
//         queryFn: () => getAllPublicTechnicians(params),
//     });
// }
