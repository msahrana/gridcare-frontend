import { ReactNode } from 'react';
import RoleGuard from '@/components/auth/role-guard';
import DashboardShell from '@/components/dashboard/dashboard-shell';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RoleGuard roles={['ADMIN', 'OPERATOR']}>
            <DashboardShell userRole="ADMIN">{children}</DashboardShell>
        </RoleGuard>
    );
};

export default AdminLayout;
