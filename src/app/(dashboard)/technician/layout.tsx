import { ReactNode } from 'react';
import RoleGuard from '@/components/auth/role-guard';
import DashboardShell from '@/components/dashboard/dashboard-shell';

const TechnicianLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RoleGuard roles={['TECHNICIAN']}>
            <DashboardShell userRole="TECHNICIAN">{children}</DashboardShell>
        </RoleGuard>
    );
};

export default TechnicianLayout;
