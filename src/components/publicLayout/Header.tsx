'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '../logo/Logo';
import { Button } from '../ui/button';
import { toast } from '../ui/toast';
import { useGetMe, useLogout } from '@/hooks';
import { UserRole } from '@/types';
import { LogOut } from 'lucide-react';

const navItems = [
    { label: 'Home', href: '/' },
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
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading } = useGetMe();
    const { mutate: logout, isPending } = useLogout();

    const role = data?.data?.role as UserRole | undefined;

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: async () => {
                // Clear cached user data
                queryClient.clear();

                toast.add({
                    title: 'Logged out',
                    description: 'Logged out successfully',
                    type: 'success',
                });

                // Redirect to home page
                router.replace('/');
                router.refresh();
            },

            onError: () => {
                toast.add({
                    title: 'Logout failed',
                    description: 'Something went wrong. Please try again.',
                    type: 'error',
                });
            },
        });
    };

    return (
        <header className="w-full h-20 border-b">
            <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
                <div>
                    <Logo />
                </div>

                <nav className="flex gap-5">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="hover:text-[#ff8a00] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}

                    {role && (
                        <Link
                            href={dashboardRoute[role]}
                            className="hover:text-[#ff8a00] transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}
                </nav>

                <div>
                    {!isLoading && !data && (
                        <Button
                            render={<Link href="/login" />}
                            nativeButton={false}
                            className="px-6"
                        >
                            Login
                        </Button>
                    )}

                    {!isLoading && data && (
                        <Button
                            onClick={handleLogout}
                            disabled={isPending}
                            className="px-5"
                        >
                            <LogOut className="text-[#0055B8]" />
                            {isPending ? 'Logging out...' : 'Logout'}
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}
