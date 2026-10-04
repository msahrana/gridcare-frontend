import {
    useMutation,
    useQuery,
    useQueryClient,
    useSuspenseQuery,
} from '@tanstack/react-query';
import {
    createOutageAssignment,
    deleteOutageAssignment,
    getAllOutageAssignments,
    updateOutageAssignment,
} from '@/api';
import {
    IOutageAssignmentResponse,
    IUpdateOutageAssignment,
    OutageAssignmentParams,
} from '@/interface';

export function useCreateOutageAssignment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOutageAssignment,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outageAssignments'],
            });
        },
    });
}

export function useGetAllOutageAssignments(params: OutageAssignmentParams) {
    return useQuery<IOutageAssignmentResponse>({
        queryKey: ['outageAssignments', params],
        queryFn: () => getAllOutageAssignments(params),
    });
}

export function useSuspenseGetAllOutageAssignments(
    params: OutageAssignmentParams,
) {
    return useSuspenseQuery<IOutageAssignmentResponse>({
        queryKey: ['outageAssignments', params],
        queryFn: () => getAllOutageAssignments(params),
    });
}

export function useUpdateOutageAssignment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: IUpdateOutageAssignment) => {
            return updateOutageAssignment(payload.id, {
                status: payload.status,
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outageAssignments'],
            });
        },
    });
}

export function useDeleteOutageAssignment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteOutageAssignment(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['outageAssignments'],
            });
        },
    });
}
