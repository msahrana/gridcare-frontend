import { ReactNode } from 'react';
import { UserRole } from '@/types';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import DashboardSidebar from './dashboard-sidebar';

interface DashboardShellProps {
    children: ReactNode;
    userRole: UserRole;
}

const DashboardShell = ({ children, userRole }: DashboardShellProps) => {
    return (
        <SidebarProvider>
            <DashboardSidebar role={userRole} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardShell;
