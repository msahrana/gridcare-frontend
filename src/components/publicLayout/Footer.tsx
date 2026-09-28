import {
    AlertCircle,
    Globe,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Share2,
    Users,
    Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const footerLinks = {
    platform: [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Report Outage', href: '/outages/report' },
        { label: 'Outage Map', href: '/outages' },
        { label: 'Load Shedding', href: '/load-shedding' },
        { label: 'Subscriptions', href: '/subscriptions' },
    ],
    company: [
        { label: 'About GridCare', href: '/about' },
        { label: 'Our Services', href: '/services' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Help Center', href: '/help' },
        { label: 'FAQs', href: '/faqs' },
    ],
    resources: [
        { label: 'Power Status', href: '/power-status' },
        { label: 'Service Areas', href: '/areas' },
        { label: 'Safety Guidelines', href: '/safety' },
        { label: 'Report an Issue', href: '/report-issue' },
        { label: 'System Status', href: '/status' },
    ],
};

const socialLinks = [
    {
        label: 'Community',
        href: '#',
        icon: Users,
    },
    {
        label: 'Messages',
        href: '#',
        icon: MessageCircle,
    },
    {
        label: 'Website',
        href: '#',
        icon: Globe,
    },
    {
        label: 'Share',
        href: '#',
        icon: Share2,
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
            {/* Emergency CTA */}
            <div className="border-b border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <div className="flex items-start gap-4">
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#ff8a00]/10 text-[#ff8a00]">
                            <AlertCircle className="size-6" />
                        </div>

                        <div>
                            <h3 className="text-base font-semibold text-white">
                                Experiencing a power outage?
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Report the issue and help our team respond
                                quickly.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/outages/report"
                        className="inline-flex w-fit items-center justify-center gap-2 rounded-lg bg-[#ff8a00] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e67c00]"
                    >
                        <Zap className="size-4" />
                        Report Outage
                    </Link>
                </div>
            </div>

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1"
                        >
                            {/* GridCare Icon */}
                            <Image
                                src="/image.png"
                                width={44}
                                height={44}
                                alt="GridCare"
                                className="size-11 rounded-xl object-cover"
                                priority
                            />

                            {/* GridCare Name */}
                            <span className="text-xl font-bold tracking-tight text-[#0055B8]">
                                Grid
                                <span className="text-[#ff8a00]">Care</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                            A smart power outage management platform designed to
                            connect customers, operators, and technicians for
                            faster and more reliable electricity service.
                        </p>

                        {/* Contact */}
                        <div className="mt-6 space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-[#ff8a00]" />

                                <Link
                                    href="mailto:support@gridcare.com"
                                    className="transition hover:text-white"
                                >
                                    support@gridcare.com
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="size-4 text-[#ff8a00]" />

                                <Link
                                    href="tel:+8801700000000"
                                    className="transition hover:text-white"
                                >
                                    +880 1700-000000
                                </Link>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-[#ff8a00]" />

                                <span>Rangpur, Bangladesh</span>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="mt-7 flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="flex size-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-200 hover:border-[#ff8a00]/50 hover:bg-[#ff8a00]/10 hover:text-[#ff8a00]"
                                    >
                                        <Icon className="size-4" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Platform
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-[#ff8a00]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Company
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-[#ff8a00]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Resources
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-[#ff8a00]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} GridCare. All rights
                        reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                        <Link
                            href="/privacy"
                            className="text-slate-500 transition hover:text-white"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="text-slate-500 transition hover:text-white"
                        >
                            Terms of Service
                        </Link>

                        <Link
                            href="/accessibility"
                            className="text-slate-500 transition hover:text-white"
                        >
                            Accessibility
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
