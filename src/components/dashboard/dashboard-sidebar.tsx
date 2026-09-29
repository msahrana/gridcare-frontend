'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarItems } from '@/interface';
import { adminRoutes, customerRoutes, technicianRoutes } from '@/routes';
import { UserRole } from '@/types';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '../ui/sidebar';
import Image from 'next/image';

const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
    ADMIN: adminRoutes,
    OPERATOR: adminRoutes,
    TECHNICIAN: technicianRoutes,
    CUSTOMER: customerRoutes,
};

const DashboardSidebar = ({ role }: { role: UserRole }) => {
    const pathname = usePathname();
    const routes: SidebarItems = sidebarRoutes[role] || [];

    return (
        <Sidebar>
            <SidebarHeader>
                <Image
                                src="/image.png"
                                width={400}
                                height={400}
                                alt="GridCare"
                                className="size-10 rounded-xl object-cover"
                                priority
                            />
            </SidebarHeader>

            <SidebarContent>
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            render={<Link href={item.url} />}
                                            isActive={pathname === item.url}
                                        >
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

export default DashboardSidebar;
