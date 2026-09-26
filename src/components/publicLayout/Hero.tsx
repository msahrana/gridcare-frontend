import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

interface ChartData {
    month: string;
    height: number;
}

const chartData: ChartData[] = [
    { month: 'jan', height: 35 },
    { month: 'feb', height: 48 },
    { month: 'mar', height: 42 },
    { month: 'apr', height: 65 },
    { month: 'may', height: 54 },
    { month: 'jun', height: 72 },
    { month: 'jul', height: 61 },
    { month: 'aug', height: 82 },
    { month: 'sep', height: 70 },
    { month: 'oct', height: 90 },
    { month: 'nov', height: 78 },
    { month: 'dec', height: 94 },
];

const Hero = () => {
    return (
        <section
            id="home"
            className="relative mb-0 overflow-hidden bg-linear-to-br from-sky-50 via-white to-blue-50"
        >
            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

            {/* Decorative Circle */}
            <div className="pointer-events-none absolute right-[15%] top-20 hidden h-24 w-24 rounded-full border border-sky-200/50 lg:block" />

            <div className="relative mx-auto grid min-h-170 max-w-7xl items-center gap-12 px-6 pt-20 pb-0 lg:grid-cols-2 lg:px-8">
                {/* ==================== HERO CONTENT ==================== */}
                <div className="max-w-2xl">
                    {/* Badge */}
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 shadow-sm">
                        <span className="flex h-2 w-2 rounded-full bg-[#ff8a00]" />

                        <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                            Smart Energy Management
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                        Powering a
                        <span className="block text-sky-500">
                            Smarter{' '}
                            <span className="text-[#ff8a00]">Future.</span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
                        GridCare helps you manage, monitor, and optimize your
                        energy infrastructure with intelligent tools built for a
                        more reliable and efficient power experience.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        {/* Primary CTA */}
                        <Link
                            href="/register"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#ff8a00] px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-[#e67a00] hover:shadow-orange-500/30"
                        >
                            Get Started
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        {/* Secondary CTA */}
                        <Link
                            href="#features"
                            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff8a00]"
                        >
                            Explore Features
                        </Link>
                    </div>

                    {/* Trust / Stats */}
                    <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-200/70 pt-7">
                        <div>
                            <p className="text-xl font-bold text-slate-900">
                                99.9%
                            </p>

                            <p className="text-xs text-slate-400">
                                System Reliability
                            </p>
                        </div>

                        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

                        <div>
                            <p className="text-xl font-bold text-slate-900">
                                24/7
                            </p>

                            <p className="text-xs text-slate-400">
                                Smart Monitoring
                            </p>
                        </div>

                        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

                        <div>
                            <p className="text-xl font-bold text-slate-900">
                                Secure
                            </p>

                            <p className="text-xs text-slate-400">
                                Cloud Platform
                            </p>
                        </div>
                    </div>
                </div>

                {/* ==================== HERO VISUAL ==================== */}
                <div className="relative mx-auto w-full max-w-xl">
                    {/* Glow */}
                    <div className="absolute inset-10 rounded-full bg-sky-400/20 blur-3xl" />

                    {/* Dashboard Card */}
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-2xl shadow-sky-900/10 backdrop-blur-xl">
                        {/* Dashboard */}
                        <div className="relative overflow-hidden rounded-[1.5rem] bg-linear-to-br from-sky-500 to-blue-700 p-8">
                            {/* Grid Background */}
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
                                    backgroundSize: '35px 35px',
                                }}
                            />

                            <div className="relative">
                                {/* Dashboard Header */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/70">
                                            Energy Overview
                                        </p>

                                        <p className="mt-1 text-3xl font-bold text-white">
                                            8.42 MW
                                        </p>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                        <Zap className="h-6 w-6 fill-white text-white" />
                                    </div>
                                </div>

                                {/* Energy Chart */}
                                <div className="mt-10 flex h-40 items-end gap-3">
                                    {chartData.map((bar) => (
                                        <div
                                            key={bar.month}
                                            className="flex-1 rounded-t-lg bg-white/80 transition-all duration-300 hover:bg-white hover:opacity-100"
                                            style={{
                                                height: `${bar.height}%`,
                                            }}
                                            title={`${bar.month}: ${bar.height}%`}
                                        />
                                    ))}
                                </div>

                                {/* Chart Footer */}
                                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-5">
                                    <span className="text-xs text-white/60">
                                        Live Energy Usage
                                    </span>

                                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
                                        +12.8%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Status Card */}
                        <div className="absolute -bottom-5 -left-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Grid Status
                                    </p>

                                    <p className="text-sm font-bold text-slate-800">
                                        All Systems Normal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Small Floating Metric */}
                    <div className="absolute -right-3 top-12 hidden rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-xl backdrop-blur sm:block">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Efficiency
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-900">
                            94.6%
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
