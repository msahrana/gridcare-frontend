import {
    Activity,
    ArrowRight,
    BarChart3,
    Bell,
    CalendarDays,
    CheckCircle2,
    MapPin,
    ShieldCheck,
    Users,
    Wrench,
    Zap,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

const features = [
    {
        icon: Zap,
        title: 'Smart Outage Management',
        description:
            'Report, verify, assign, monitor, and manage power outages through a structured digital workflow.',
    },
    {
        icon: Wrench,
        title: 'Technician Coordination',
        description:
            'Connect operators with available technicians and streamline outage response and restoration.',
    },
    {
        icon: MapPin,
        title: 'Power Network Management',
        description:
            'Manage zones, substations, feeders, and service areas with better operational visibility.',
    },
    {
        icon: CalendarDays,
        title: 'Load-Shedding Schedules',
        description:
            'Publish and manage planned load-shedding schedules so customers stay informed.',
    },
    {
        icon: Bell,
        title: 'Real-Time Notifications',
        description:
            'Keep customers, technicians, and operators informed about important service updates.',
    },
    {
        icon: BarChart3,
        title: 'Analytics & Insights',
        description:
            'Turn operational data into useful insights for outages, restoration, and service performance.',
    },
];

const workflow = [
    {
        number: '01',
        title: 'Report',
        description:
            'Customers report power-related issues and provide relevant service-area information.',
    },
    {
        number: '02',
        title: 'Verify',
        description:
            'Operators review and verify reported outages before starting the response process.',
    },
    {
        number: '03',
        title: 'Assign',
        description:
            'Technicians are assigned to outages based on availability and operational requirements.',
    },
    {
        number: '04',
        title: 'Restore',
        description:
            'Technicians work on the affected area while restoration progress is tracked.',
    },
    {
        number: '05',
        title: 'Monitor',
        description:
            'Operators monitor outage activity, restoration progress, schedules, and performance.',
    },
];

const stakeholders = [
    {
        icon: Users,
        title: 'Customers',
        description:
            'Access outage information, load-shedding schedules, notifications, and service updates.',
    },
    {
        icon: Wrench,
        title: 'Technicians',
        description:
            'Receive assignments, manage field activities, and keep operational information organized.',
    },
    {
        icon: Activity,
        title: 'Operators',
        description:
            'Monitor outages, coordinate technicians, manage schedules, and oversee operations.',
    },
    {
        icon: ShieldCheck,
        title: 'Administrators',
        description:
            'Manage users, resources, subscriptions, system activities, and organizational data.',
    },
];

const benefits = [
    'One connected platform for power outage operations',
    'Structured outage reporting and restoration workflow',
    'Efficient technician assignment and coordination',
    'Transparent service and operational management',
    'Centralized analytics and operational insights',
    'Secure role-based access control',
];

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden border-b bg-linear-to-br from-sky-50 via-background to-blue-50 dark:from-slate-950 dark:via-background dark:to-blue-950/30">
                <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:py-28">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Hero content */}
                        <div>
                            <Badge
                                variant="secondary"
                                className="mb-6 gap-2 px-4 py-2 text-sm"
                            >
                                <Zap className="h-4 w-4 text-[#0055B8]" />
                                <span className="text-[#0055B8] font-bold">
                                    Smart Power Management
                                </span>
                            </Badge>

                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                                Powering Reliability.
                                <span className="block text-[#0055B8]">
                                    Connecting
                                </span>
                                <span className="block text-[#ff8a00]">
                                    Communities.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                                GridCare is a smart power outage management
                                platform designed to help electricity
                                authorities, operators, technicians, and
                                customers manage power outages more efficiently
                                and transparently.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Button size="lg">
                                    <Link href="/register">
                                        <span className="flex">
                                            Get Started
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </span>
                                    </Link>
                                </Button>

                                <Button size="lg" variant="outline">
                                    <Link href="/">Explore GridCare</Link>
                                </Button>
                            </div>
                        </div>

                        {/* Dashboard preview */}
                        <Card className="overflow-hidden border-sky-100 shadow-2xl">
                            <div className="bg-slate-950 p-6 text-white">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-400">
                                            GridCare Dashboard
                                        </p>

                                        <h3 className="mt-1 text-xl font-semibold">
                                            Power Operations
                                        </h3>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-white/10 p-4">
                                        <p className="text-xs text-slate-400">
                                            Active Outages
                                        </p>

                                        <p className="mt-2 text-3xl font-bold">
                                            24
                                        </p>

                                        <p className="mt-1 text-xs text-emerald-400">
                                            Live monitoring
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-white/10 p-4">
                                        <p className="text-xs text-slate-400">
                                            Technicians
                                        </p>

                                        <p className="mt-2 text-3xl font-bold">
                                            48
                                        </p>

                                        <p className="mt-1 text-xs text-sky-400">
                                            Available
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 rounded-xl bg-white/10 p-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-slate-300">
                                            Restoration Progress
                                        </span>

                                        <span className="text-sm font-semibold text-sky-400">
                                            82%
                                        </span>
                                    </div>

                                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-[82%] rounded-full bg-sky-500" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <Badge variant="outline" className="mb-4">
                        Our Mission
                    </Badge>

                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0055B8]">
                        Making power outage management smarter
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        Our mission is to make power outage management faster,
                        smarter, and more transparent. GridCare brings outage
                        reporting, technician coordination, load-shedding
                        schedules, customer services, notifications, and
                        analytics into one centralized platform.
                    </p>
                </div>
            </section>

            <Separator />

            {/* Features */}
            <section className="bg-muted/30">
                <div className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <Badge variant="outline" className="mb-4">
                            What We Do
                        </Badge>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0055B8]">
                            Everything you need to manage power outages
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            GridCare connects the essential parts of power
                            outage management through one modern platform.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <Card
                                    key={feature.title}
                                    className="group transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
                                >
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-950">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <CardTitle className="pt-2">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="leading-7 text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Workflow */}
            <section className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <Badge variant="outline" className="mb-4">
                            How GridCare Works
                        </Badge>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0055B8]">
                            From outage report to restoration
                        </h2>

                        <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                            GridCare creates a connected workflow that helps
                            power service teams respond to outages while keeping
                            customers informed throughout the process.
                        </p>

                        <Image
                            src="/sideBanner.png"
                            width={400}
                            height={400}
                            alt="GridCare"
                            className="size-fit rounded-xl object-cover mt-8"
                            priority
                        />
                    </div>

                    <div className="space-y-4">
                        {workflow.map((item) => (
                            <Card
                                key={item.number}
                                className="transition hover:border-sky-300 hover:shadow-md"
                            >
                                <CardContent className="flex gap-5 p-5">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-sm font-bold text-white">
                                        {item.number}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stakeholders */}
            <section className="bg-slate-950 text-white">
                <div className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <Badge className="border-sky-400/20 bg-sky-500/10 text-sky-400">
                            Built For Everyone
                        </Badge>

                        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                            One platform. Multiple stakeholders.
                        </h2>

                        <p className="mt-4 text-slate-400">
                            GridCare provides purpose-built tools for everyone
                            involved in modern power outage management.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stakeholders.map((stakeholder) => {
                            const Icon = stakeholder.icon;

                            return (
                                <Card
                                    key={stakeholder.title}
                                    className="border-white/10 bg-white/5 text-white backdrop-blur transition hover:bg-white/10"
                                >
                                    <CardHeader>
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                                            <Icon className="h-6 w-6" />
                                        </div>

                                        <CardTitle className="pt-2 text-white">
                                            {stakeholder.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-sm leading-6 text-slate-400">
                                            {stakeholder.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why GridCare */}
            <section className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <Badge variant="outline" className="mb-4">
                            Why GridCare
                        </Badge>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0055B8]">
                            Designed for smarter power operations
                        </h2>

                        <p className="mt-5 leading-7 text-muted-foreground">
                            GridCare combines structured workflows, operational
                            data, and modern technology to simplify complex
                            power outage management.
                        </p>

                        <div className="mt-8 space-y-4">
                            {benefits.map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

                                    <span className="text-sm sm:text-base">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Card className="overflow-hidden border-sky-200 bg-linear-to-br from-sky-600 to-blue-700 text-white shadow-xl">
                        <CardHeader className="p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                                <Zap className="h-6 w-6" />
                            </div>

                            <CardTitle className="pt-5 text-2xl text-white">
                                Our Vision
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="px-8 pb-8">
                            <p className="text-lg leading-8 text-sky-50">
                                We envision a future where power outage
                                management is more connected, responsive, and
                                customer-focused.
                            </p>

                            <Separator className="my-6 bg-white/20" />

                            <p className="text-sm leading-7 text-sky-100">
                                GridCare combines technology, structured
                                workflows, and actionable data to support modern
                                electricity service operations.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t bg-muted/30">
                <div className="container mx-auto px-4 py-20 text-center sm:px-6">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                        <Zap className="h-7 w-7" />
                    </div>

                    <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl text-[#0055B8]">
                        Building a smarter power network together
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                        GridCare is committed to helping power service teams
                        work smarter while keeping communities better informed.
                    </p>

                    <Button size="lg" className="mt-8">
                        <Link href="/register">
                            <span className="flex">
                                Get Started with GridCare
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </span>
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
