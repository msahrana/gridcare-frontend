'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Logo from '../logo/Logo';
import { Button } from '../ui/button';
import { toast } from '../ui/toast';
import { useGetMe, useLogout } from '@/hooks';
import { UserRole } from '@/types';
import { LogOut } from 'lucide-react';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'Plans', href: '#plans' },
    { label: 'About', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
    { label: 'ApplyAsTechnician', href: '/applyAsTechnician' },
];

const dashboardRoute: Record<UserRole, string> = {
    ADMIN: '/admin',
    OPERATOR: '/admin',
    TECHNICIAN: '/technician',
    CUSTOMER: '/customer',
};

export default function Header() {
    const { data, isLoading } = useGetMe();
    const { mutate: logout } = useLogout();
    const queryClient = useQueryClient();

    const role: UserRole = !!data?.data && data?.data.role;

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
                toast.add({
                    title: 'Tata',
                    description: 'Logged out successfully',
                    type: 'success',
                });

                queryClient.removeQueries({ queryKey: ['user'] });
            },

            onError: () => {
                toast.add({
                    title: 'Logout failed',
                    description: 'Something Went Wrong',
                    type: 'error',
                });
            },
        });
    };

    return (
        <header className="w-full h-20 border-b">
            <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
                <div>
                    {/* Logo */}
                    <Logo />
                </div>

                {/* Desktop Navigation */}
                <nav className="flex gap-5 ">
                    {navItems.map((item) => (
                        <Link key={item.label} href={item.href}>
                            {item.label}
                        </Link>
                    ))}

                    {role && (
                        <Link
                            href={dashboardRoute[role]}
                            className="hover:text-[#ff8a00]"
                        >
                            Dashboard
                        </Link>
                    )}
                </nav>

                <div>
                    {!isLoading && !data && (
                        <Button
                            render={<Link href="/login">Login</Link>}
                            nativeButton={false}
                            className="px-6"
                        >
                            Login
                        </Button>
                    )}
                    {!isLoading && data && (
                        <Button onClick={handleLogout} className="px-5">
                            <LogOut className="text-[#0055B8]" />
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
