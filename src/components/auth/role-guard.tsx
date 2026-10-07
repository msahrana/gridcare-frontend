'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useGetMe } from '@/hooks';
import { UserRole } from '@/types';
import AccessDenied from './access-denied';
import AuthLoading from './auth-loading';

interface IProps {
    children: ReactNode;
    roles: UserRole[];
}

const RoleGuard = ({ children, roles }: IProps) => {
    const router = useRouter();

    const [mounted, setMounted] = useState(false);

    const { data, isPending, isError } = useGetMe();

    const user = data?.data;

    const isAuthorized = !!user && roles.includes(user.role);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || isPending) {
            return;
        }

        if (isError || !user) {
            router.replace('/login');
        }
    }, [mounted, isPending, isError, user, router]);

    // Keep server and initial client render identical
    if (!mounted) {
        return <AuthLoading />;
    }

    if (isPending) {
        return <AuthLoading />;
    }

    if (isError || !user) {
        return <AuthLoading label="Redirecting..." />;
    }

    if (isAuthorized) {
        return <>{children}</>;
    }

    return <AccessDenied />;
};

export default RoleGuard;
