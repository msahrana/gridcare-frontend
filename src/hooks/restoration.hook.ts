import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';

import {
    cancelRestoration,
    completedRestoration,
    deleteRestoration,
    getAllRestorations,
    getRestorationById,
    startRestoration,
} from '@/api';

import {
    ICreateRestoration,
    IRestorationResponse,
    IUpdateRestoration,
    RestorationsParams,
} from '@/interface';

/* =========================
   Start Restoration
========================= */

export function useStartRestoration() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateRestoration) => startRestoration(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['restorations'],
            });

            queryClient.invalidateQueries({
                queryKey: ['outages'],
            });
        },
    });
}

/* =========================
   Get All Restorations
========================= */

export function useGetAllRestorations(params: RestorationsParams) {
    return useQuery<IRestorationResponse>({
        queryKey: ['restorations', params],

        queryFn: () => getAllRestorations(params),
    });
}

/* =========================
   Suspense Get All
========================= */

export function useSuspenseGetAllRestorations(params: RestorationsParams) {
    return useSuspenseQuery<IRestorationResponse>({
        queryKey: ['restorations', params],

        queryFn: () => getAllRestorations(params),
    });
}

/* =========================
   Get Single Restoration
========================= */

export function useGetRestorationById(id: string) {
    return useQuery({
        queryKey: ['restorations', id],

        queryFn: () => getRestorationById(id),

        enabled: Boolean(id),
    });
}

/* =========================
   Complete Restoration
========================= */

export function useCompleteRestoration() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload?: Omit<IUpdateRestoration, 'id'>;
        }) => completedRestoration(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['restorations'],
            });

            queryClient.invalidateQueries({
                queryKey: ['outages'],
            });
        },
    });
}

/* =========================
   Cancel Restoration
========================= */

export function useCancelRestoration() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload?: Omit<IUpdateRestoration, 'id'>;
        }) => cancelRestoration(id, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['restorations'],
            });

            queryClient.invalidateQueries({
                queryKey: ['outages'],
            });
        },
    });
}

/* =========================
   Delete Restoration
========================= */

export function useDeleteRestoration() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteRestoration(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['restorations'],
            });
        },
    });
}
