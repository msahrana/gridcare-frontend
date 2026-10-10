'use client';

import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    getAllUsers,
    getMe,
    googleOAuth,
    userLogin,
    userLogout,
    userRegistration,
    verifyAccount,
} from '@/api';

export function useRegister() {
    return useMutation({
        mutationFn: userRegistration,
    });
}

export function useVerifyAccount() {
    return useMutation({
        mutationFn: verifyAccount,
    });
}

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userLogin,

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
    });
}

export function useLogout() {
    return useMutation({
        mutationFn: userLogout,
    });
}

export function useGoogleOAuth() {
    return useMutation({
        mutationFn: googleOAuth,
    });
}

export function useGetMe() {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        retry: false,
    });
}

export function useSuspenseGetAllUsers() {
    return useSuspenseQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    });
}
