import {
    Activity,
    BarChart3,
    BellRing,
    CheckCircle2,
    Gauge,
    MapPin,
    Network,
    ShieldCheck,
    Users,
    Wrench,
    Zap,
    ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

import Hero from '@/components/publicLayout/Hero';

const features = [
    {
        icon: Activity,
        title: 'Real-Time Monitoring',
        description:
            'Monitor power infrastructure, outages, and system activity from one centralized platform.',
    },
    {
        icon: BellRing,
        title: 'Smart Outage Management',
        description:
            'Track planned and unexpected outages with clear status updates and restoration progress.',
    },
    {
        icon: BarChart3,
        title: 'Power Analytics',
        description:
            'Turn operational data into useful insights for better decisions and improved reliability.',
    },
    {
        icon: Network,
        title: 'Grid Hierarchy',
        description:
            'Manage zones, substations, feeders, and service areas through a connected structure.',
    },
    {
        icon: Gauge,
        title: 'Performance Tracking',
        description:
            'Keep an eye on infrastructure performance and identify areas that need attention.',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Platform',
        description:
            'Role-based access and centralized management help keep your energy operations protected.',
    },
];

const infrastructure = [
    {
        icon: MapPin,
        number: '01',
        title: 'Zones',
        description: 'Organize your electrical network by operational zones.',
    },
    {
        icon: Zap,
        number: '02',
        title: 'Substations',
        description: 'Manage substations, capacity, and operational status.',
    },
    {
        icon: Network,
        number: '03',
        title: 'Feeders',
        description: 'Track feeders and their current operational conditions.',
    },
    {
        icon: Users,
        number: '04',
        title: 'Service Areas',
        description:
            'Connect customers and service locations to the grid hierarchy.',
    },
];

const steps = [
    {
        number: '01',
        title: 'Connect',
        description:
            'Set up your electrical infrastructure and organize it into a clear hierarchy.',
    },
    {
        number: '02',
        title: 'Monitor',
        description:
            'Track outages, infrastructure status, and operational activity in one place.',
    },
    {
        number: '03',
        title: 'Respond',
        description:
            'Coordinate restoration activities and respond faster to power disruptions.',
    },
];

export default function Home() {
    return (
        <div className="overflow-hidden">
            {/* =========================
                HERO
            ========================= */}
            <Hero />

            {/* =========================
                FEATURES
            ========================= */}
            <section id="features" className="bg-white px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0055B8]">
                            Powerful Features
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                            Everything you need to manage
                            <span className="text-[#0055B8]">
                                {' '}
                                smarter energy
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
                            GridCare brings infrastructure monitoring, outage
                            management, analytics, and operational tools
                            together in one intelligent platform.
                        </p>
                    </div>

                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-900/5"
                                >
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-[#0055B8] transition group-hover:bg-[#0055B8] group-hover:text-white">
                                        <Icon className="size-5" />
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-slate-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================
                INFRASTRUCTURE
            ========================= */}
            <section className="bg-slate-50 px-6 py-24 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span className="inline-flex rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#ff8a00]">
                            Connected Infrastructure
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            One connected view of your
                            <span className="text-[#0055B8]"> entire grid</span>
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
                            Keep your electrical infrastructure organized from
                            the highest operational level down to individual
                            service areas.
                        </p>

                        <div className="mt-8 flex flex-col gap-4">
                            {[
                                'Centralized infrastructure management',
                                'Clear operational hierarchy',
                                'Faster outage identification',
                                'Better restoration coordination',
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />

                                    <span className="text-sm font-medium text-slate-700">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {infrastructure.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-sm"
                                >
                                    <span className="absolute right-5 top-4 text-4xl font-black text-slate-100">
                                        {item.number}
                                    </span>

                                    <div className="relative">
                                        <div className="flex size-11 items-center justify-center rounded-xl bg-[#0055B8] text-white">
                                            <Icon className="size-5" />
                                        </div>

                                        <h3 className="mt-5 text-lg font-bold text-slate-900">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =========================
                HOW IT WORKS
            ========================= */}
            <section className="bg-white px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0055B8]">
                            How It Works
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            From monitoring to
                            <span className="text-[#ff8a00]">
                                {' '}
                                faster response
                            </span>
                        </h2>

                        <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
                            A simple workflow designed to help teams stay
                            informed and respond efficiently.
                        </p>
                    </div>

                    <div className="relative mt-16 grid gap-8 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="relative text-center"
                            >
                                {index !== steps.length - 1 && (
                                    <div className="absolute left-[calc(50%+60px)] right-[calc(-50%+60px)] top-8 hidden h-px bg-slate-200 md:block" />
                                )}

                                <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-[#0055B8] text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                                    {step.number}
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-900">
                                    {step.title}
                                </h3>

                                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================
                TECHNICIAN CTA
            ========================= */}
            <section className="px-6 py-16 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0055B8] to-sky-500 px-7 py-16 text-center shadow-2xl shadow-blue-900/10 sm:px-12">
                        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />

                        <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-blue-900/20 blur-3xl" />

                        <div className="relative mx-auto max-w-3xl">
                            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                                <Wrench className="size-6" />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to build a smarter power network?
                            </h2>

                            <p className="mt-5 text-base leading-7 text-white/75 sm:text-lg">
                                Join GridCare and bring your energy
                                infrastructure, monitoring, and restoration
                                workflows into one connected platform.
                            </p>

                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    href="/register"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8a00] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e67a00]"
                                >
                                    Get Started
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <Link
                                    href="/applyAsTechnician"
                                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-[#0055B8]"
                                >
                                    Join as Technician
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
