'use client';

import {
    Bell,
    ChevronRight,
    Globe,
    LockKeyhole,
    Mail,
    Moon,
    ShieldCheck,
    UserRound,
} from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your account, notifications, security, and
                    preferences.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Settings Navigation */}
                <div className="h-fit rounded-2xl border bg-card shadow-sm">
                    <div className="border-b px-5 py-4">
                        <h2 className="font-semibold">Settings</h2>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Manage your GridCare account
                        </p>
                    </div>

                    <div className="p-2">
                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 text-left text-sm font-medium text-primary"
                        >
                            <UserRound className="size-4" />
                            Account
                        </button>

                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Bell className="size-4" />
                            Notifications
                        </button>

                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <ShieldCheck className="size-4" />
                            Security
                        </button>

                        <button
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                            <Globe className="size-4" />
                            Preferences
                        </button>
                    </div>
                </div>

                {/* Main Settings */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Account */}
                    <section className="rounded-2xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                    <UserRound className="size-5 text-primary" />
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        Account Settings
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Manage your account information
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y">
                            <button
                                type="button"
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <Mail className="size-4 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Email Address
                                        </p>

                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            customer@example.com
                                        </p>
                                    </div>
                                </div>

                                <ChevronRight className="size-4 text-muted-foreground" />
                            </button>

                            <button
                                type="button"
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <UserRound className="size-4 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Personal Information
                                        </p>

                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Update your name, phone, and address
                                        </p>
                                    </div>
                                </div>

                                <ChevronRight className="size-4 text-muted-foreground" />
                            </button>
                        </div>
                    </section>

                    {/* Notifications */}
                    <section className="rounded-2xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Bell className="size-5 text-primary" />
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        Notifications
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Choose how GridCare notifies you
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y">
                            <div className="flex items-center justify-between gap-5 px-6 py-5">
                                <div>
                                    <p className="text-sm font-medium">
                                        Load Shedding Alerts
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Receive notifications about upcoming
                                        load shedding schedules.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="relative h-6 w-11 shrink-0 rounded-full bg-primary"
                                    aria-label="Load shedding alerts enabled"
                                >
                                    <span className="absolute right-1 top-1 size-4 rounded-full bg-white shadow-sm" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-5 px-6 py-5">
                                <div>
                                    <p className="text-sm font-medium">
                                        Service Updates
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Get important updates about your
                                        GridCare service.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="relative h-6 w-11 shrink-0 rounded-full bg-primary"
                                    aria-label="Service updates enabled"
                                >
                                    <span className="absolute right-1 top-1 size-4 rounded-full bg-white shadow-sm" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="rounded-2xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                    <LockKeyhole className="size-5 text-primary" />
                                </div>

                                <div>
                                    <h2 className="font-semibold">Security</h2>

                                    <p className="text-sm text-muted-foreground">
                                        Protect your GridCare account
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y">
                            <button
                                type="button"
                                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-muted/40"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <LockKeyhole className="size-4 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Change Password
                                        </p>

                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Update your account password
                                        </p>
                                    </div>
                                </div>

                                <ChevronRight className="size-4 text-muted-foreground" />
                            </button>

                            <div className="flex items-center justify-between gap-4 px-6 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-950/40">
                                        <ShieldCheck className="size-4 text-green-600 dark:text-green-400" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Account Security
                                        </p>

                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Your account is protected
                                        </p>
                                    </div>
                                </div>

                                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                                    Secure
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Preferences */}
                    <section className="rounded-2xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Globe className="size-5 text-primary" />
                                </div>

                                <div>
                                    <h2 className="font-semibold">
                                        Preferences
                                    </h2>

                                    <p className="text-sm text-muted-foreground">
                                        Customize your GridCare experience
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y">
                            <div className="flex items-center justify-between px-6 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <Globe className="size-4 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Language
                                        </p>

                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Choose your preferred language
                                        </p>
                                    </div>
                                </div>

                                <select
                                    defaultValue="English"
                                    className="rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                >
                                    <option>English</option>
                                    <option>বাংলা</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between px-6 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                                        <Moon className="size-4 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Appearance
                                        </p>

                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            Use your system appearance
                                        </p>
                                    </div>
                                </div>

                                <span className="rounded-lg border bg-background px-3 py-2 text-sm">
                                    System
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Settings;
