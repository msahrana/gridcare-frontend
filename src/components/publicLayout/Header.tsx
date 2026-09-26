import { Menu } from 'lucide-react';
import Link from 'next/link';
import Logo from '../logo/Logo';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'Plans', href: '#plans' },
    { label: 'About', href: '/about-us' },
    { label: 'Contact', href: '/contact-us' },
];

export default function Header() {
    return (
        <header className="w-full bg-white">
            {/* ==================== NAVBAR ==================== */}
            <nav className="border-b border-slate-100 bg-white/90 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-medium transition ${
                                    item.label === 'Home'
                                        ? 'text-slate-900'
                                        : 'text-slate-500 hover:text-[#ff8a00]'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 md:flex">
                        <Link
                            href="/login"
                            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-50 hover:text-[#ff8a00] bg-blue-500"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-full bg-[#ff8a00] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#e67a00] hover:shadow-orange-500/30"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff8a00] md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </nav>
        </header>
    );
}
