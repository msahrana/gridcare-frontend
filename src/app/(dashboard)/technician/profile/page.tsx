'use client';

import {
    BadgeCheck,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Edit3,
    FileText,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    UserRound,
    Wrench,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const TechnicianProfile = () => {
    // Replace with your technician profile API data
    const technician = {
        name: 'Mohammad Rahim',
        employeeId: 'TECH-2026-001',
        email: 'rahim@example.com',
        phone: '+880 1712-345678',
        location: 'Rangpur, Bangladesh',
        specialization: 'Electrical Maintenance',
        experience: '5 Years',
        availability: 'Available',
        status: 'Verified',
        joinedDate: 'January 15, 2026',
        bio: 'Experienced electrical technician specializing in power distribution, outage restoration, and electrical infrastructure maintenance.',
        skills: [
            'Power Distribution',
            'Outage Restoration',
            'Electrical Maintenance',
            'Safety Inspection',
            'Fault Diagnosis',
        ],
    };

    return (
        <div className="min-h-screen space-y-6 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                        <UserRound className="h-4 w-4" />
                        Technician Portal
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your professional information and technician
                        details.
                    </p>
                </div>

                <Button
                    className="w-full bg-[#0055B8] hover:bg-[#004494] sm:w-auto"
                    onClick={() => {
                        // Connect your profile edit route or dialog here.
                    }}
                >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </div>

            {/* Profile Banner */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="h-32 bg-linear-to-r from-[#003B82] via-[#0055B8] to-[#2588E8] sm:h-40">
                    <div className="flex h-full items-start justify-end p-4 sm:p-6">
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                            <ShieldCheck className="h-4 w-4" />
                            GridCare Technician
                        </div>
                    </div>
                </div>

                <div className="px-5 pb-6 sm:px-8">
                    <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-blue-50 text-3xl font-bold text-[#0055B8] shadow-sm sm:h-28 sm:w-28">
                                {technician.name
                                    .split(' ')
                                    .map((word) => word[0])
                                    .slice(0, 2)
                                    .join('')}
                            </div>

                            <div className="pt-1 sm:pb-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                                        {technician.name}
                                    </h2>
                                    <BadgeCheck className="h-5 w-5 text-blue-600" />
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    {technician.specialization}
                                </p>

                                <p className="mt-2 text-xs font-medium text-slate-400">
                                    Employee ID: {technician.employeeId}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:pb-1">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                {technician.status}
                            </span>

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                <span className="h-2 w-2 rounded-full bg-blue-500" />
                                {technician.availability}
                            </span>
                        </div>
                    </div>

                    <div className="mt-7 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 xl:grid-cols-3">
                        <ContactItem
                            icon={<Mail />}
                            label="Email Address"
                            value={technician.email}
                        />
                        <ContactItem
                            icon={<Phone />}
                            label="Phone Number"
                            value={technician.phone}
                        />
                        <ContactItem
                            icon={<MapPin />}
                            label="Location"
                            value={technician.location}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Left Column */}
                <div className="space-y-6 xl:col-span-2">
                    {/* About */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <SectionTitle
                            icon={<UserRound />}
                            title="About Me"
                            subtitle="Your professional introduction"
                        />

                        <p className="mt-5 text-sm leading-7 text-slate-600">
                            {technician.bio}
                        </p>
                    </section>

                    {/* Personal Information */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <SectionTitle
                            icon={<BriefcaseBusiness />}
                            title="Professional Information"
                            subtitle="Your role and work experience"
                        />

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <InfoItem
                                label="Specialization"
                                value={technician.specialization}
                                icon={<Wrench />}
                            />
                            <InfoItem
                                label="Work Experience"
                                value={technician.experience}
                                icon={<Clock3 />}
                            />
                            <InfoItem
                                label="Employee ID"
                                value={technician.employeeId}
                                icon={<BadgeCheck />}
                            />
                            <InfoItem
                                label="Joining Date"
                                value={technician.joinedDate}
                                icon={<CalendarDays />}
                            />
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <SectionTitle
                            icon={<Wrench />}
                            title="Skills & Expertise"
                            subtitle="Your technical capabilities"
                        />

                        <div className="mt-5 flex flex-wrap gap-2">
                            {technician.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2 text-sm font-medium text-[#0055B8]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Account Status */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <SectionTitle
                            icon={<ShieldCheck />}
                            title="Account Status"
                            subtitle="Your verification overview"
                        />

                        <div className="mt-5 space-y-4">
                            <StatusRow
                                title="Account Verification"
                                description="Technician account status"
                                status="Verified"
                            />
                            <div className="border-t border-slate-100" />
                            <StatusRow
                                title="Professional Profile"
                                description="Profile information"
                                status="Active"
                            />
                        </div>
                    </section>

                    {/* Quick Information */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <SectionTitle
                            icon={<FileText />}
                            title="Profile Summary"
                            subtitle="A quick overview of your account"
                        />

                        <div className="mt-5 space-y-4">
                            <SummaryRow
                                label="Specialization"
                                value="Electrical"
                            />
                            <SummaryRow
                                label="Experience"
                                value={technician.experience}
                            />
                            <SummaryRow
                                label="Availability"
                                value={technician.availability}
                            />
                            <SummaryRow
                                label="Account Type"
                                value="Technician"
                            />
                        </div>
                    </section>

                    {/* Help Card */}
                    <section className="rounded-2xl bg-linear-to-br from-[#003B82] to-[#0067CE] p-5 text-white shadow-sm sm:p-6">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                            <ShieldCheck className="h-6 w-6" />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold">
                            Keep your profile updated
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-blue-100">
                            Make sure your contact information and technical
                            skills are up to date so your team can coordinate
                            restoration work efficiently.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

const ContactItem = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
            {icon}
        </div>

        <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400">{label}</p>
            <p className="mt-1 wrap-break-word text-sm font-medium text-slate-800">
                {value}
            </p>
        </div>
    </div>
);

const SectionTitle = ({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) => (
    <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0055B8]">
            {icon}
        </div>

        <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
    </div>
);

const InfoItem = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 text-slate-400">{icon}</div>
        <div>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
        </div>
    </div>
);

const StatusRow = ({
    title,
    description,
    status,
}: {
    title: string;
    description: string;
    status: string;
}) => (
    <div className="flex items-center justify-between gap-3">
        <div>
            <p className="text-sm font-medium text-slate-800">{title}</p>
            <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            {status}
        </span>
    </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="text-right text-sm font-semibold text-slate-800">
            {value}
        </span>
    </div>
);

export default TechnicianProfile;
