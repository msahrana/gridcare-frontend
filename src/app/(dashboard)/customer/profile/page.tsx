'use client';

import {
    CheckCircle2,
    Edit3,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User,
} from 'lucide-react';

const Profile = () => {
    return (
        <div className="min-h-full space-y-6 ml-5 mt-5">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your personal information and account preferences.
                </p>
            </div>

            {/* Profile Overview */}
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                {/* Cover */}
                <div className="h-32 bg-linear-to-r from-primary/90 via-primary/70 to-primary/50" />

                {/* Profile Header */}
                <div className="relative px-6 pb-6">
                    <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                            {/* Avatar */}
                            <div className="flex size-24 shrink-0 items-center justify-center rounded-full border-4 border-background bg-muted shadow-md">
                                <User className="size-11 text-muted-foreground" />
                            </div>

                            {/* Name */}
                            <div className="pb-1 text-center sm:text-left">
                                <div className="flex flex-col items-center gap-2 sm:flex-row">
                                    <h2 className="text-xl font-bold">
                                        Customer Name
                                    </h2>

                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                                        <CheckCircle2 className="size-3.5" />
                                        Active
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    GridCare Customer
                                </p>
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
                        >
                            <Edit3 className="size-4" />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Personal Information */}
                <div className="rounded-2xl border bg-card shadow-sm lg:col-span-2">
                    <div className="border-b px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                <User className="size-5 text-primary" />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Personal Information
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Your basic account information
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 p-6 sm:grid-cols-2">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Full Name
                            </p>

                            <div className="flex items-center gap-3">
                                <User className="size-4 text-muted-foreground" />

                                <p className="text-sm font-medium">
                                    Customer Name
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Email Address
                            </p>

                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-muted-foreground" />

                                <p className="break-all text-sm font-medium">
                                    customer@example.com
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Phone Number
                            </p>

                            <div className="flex items-center gap-3">
                                <Phone className="size-4 text-muted-foreground" />

                                <p className="text-sm font-medium">
                                    01XXXXXXXXX
                                </p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Address
                            </p>

                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                <p className="text-sm font-medium">
                                    Customer Address
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="rounded-2xl border bg-card shadow-sm">
                    <div className="border-b px-6 py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                <ShieldCheck className="size-5 text-primary" />
                            </div>

                            <div>
                                <h3 className="font-semibold">Account</h3>

                                <p className="text-sm text-muted-foreground">
                                    Account information
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 p-6">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Account Type
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                                Customer
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Account Status
                            </p>

                            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                                <span className="size-2 rounded-full bg-green-500" />
                                Active
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                Member Since
                            </p>

                            <p className="mt-1 text-sm font-semibold">
                                September 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Notice */}
            <div className="flex gap-4 rounded-2xl border bg-muted/40 p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="size-5 text-primary" />
                </div>

                <div>
                    <h3 className="text-sm font-semibold">
                        Keep your account information secure
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Never share your password or verification codes with
                        anyone. GridCare will never ask you to share sensitive
                        account information through an unsecured channel.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
