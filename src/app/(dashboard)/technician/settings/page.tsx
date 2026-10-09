'use client';

import { useState } from 'react';

import {
    Bell,
    Check,
    ChevronRight,
    Clock,
    Eye,
    EyeOff,
    Globe,
    KeyRound,
    LockKeyhole,
    LogOut,
    Mail,
    Moon,
    Monitor,
    Save,
    ShieldCheck,
    Smartphone,
    Sun,
    Trash2,
    Wrench,
    Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

type ToggleSettingProps = {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

const TechnicianSettings = () => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        assignments: true,
        restoration: true,
        announcements: false,
    });

    const [preferences, setPreferences] = useState({
        availability: true,
        twoFactor: false,
    });

    const [appearance, setAppearance] = useState('light');
    const [language, setLanguage] = useState('en');
    const [saved, setSaved] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const updateNotification = (
        key: keyof typeof notifications,
        value: boolean,
    ) => {
        setNotifications((previous) => ({
            ...previous,
            [key]: value,
        }));
        setSaved(false);
    };

    const updatePreference = (
        key: keyof typeof preferences,
        value: boolean,
    ) => {
        setPreferences((previous) => ({
            ...previous,
            [key]: value,
        }));
        setSaved(false);
    };

    const handleSave = () => {
        // TODO: Send preferences to your backend API.
        // Example: await updateTechnicianSettings({
        //   notifications,
        //   preferences,
        //   appearance,
        //   language,
        // });

        setSaved(true);
    };

    return (
        <div className="min-h-screen space-y-6 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                        <Wrench className="h-4 w-4" />
                        Technician Portal
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Settings
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your account, notifications, and work
                        preferences.
                    </p>
                </div>

                <Button
                    onClick={handleSave}
                    className="w-full bg-[#0055B8] hover:bg-[#004494] sm:w-auto"
                >
                    {saved ? (
                        <Check className="mr-2 h-4 w-4" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    {saved ? 'Saved' : 'Save Changes'}
                </Button>
            </div>

            {/* Settings Notice */}
            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0055B8]" />
                <div>
                    <p className="text-sm font-semibold text-slate-800">
                        Keep your account secure
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                        Review your security preferences and keep your contact
                        information up to date to receive important work
                        updates.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
                {/* Main Settings */}
                <div className="space-y-6 xl:col-span-2">
                    {/* Work Preferences */}
                    <SettingsCard
                        icon={<Zap />}
                        title="Work Preferences"
                        description="Control your technician availability and assignments."
                    >
                        <ToggleSetting
                            title="Available for assignments"
                            description="Let administrators know when you are available for work."
                            checked={preferences.availability}
                            onChange={(value) =>
                                updatePreference('availability', value)
                            }
                        />

                        <Divider />

                        <div className="flex items-center gap-3 py-2">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0055B8]">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-slate-800">
                                    Work schedule
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Manage your working hours and availability.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    window.alert(
                                        'Connect your work schedule page here.',
                                    )
                                }
                                className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#0055B8] hover:underline"
                            >
                                Manage
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </SettingsCard>

                    {/* Notifications */}
                    <SettingsCard
                        icon={<Bell />}
                        title="Notifications"
                        description="Choose which updates you want to receive."
                    >
                        <ToggleSetting
                            title="Email notifications"
                            description="Receive important updates through your email."
                            checked={notifications.email}
                            onChange={(value) =>
                                updateNotification('email', value)
                            }
                        />

                        <Divider />

                        <ToggleSetting
                            title="Push notifications"
                            description="Receive notifications in your browser or device."
                            checked={notifications.push}
                            onChange={(value) =>
                                updateNotification('push', value)
                            }
                        />

                        <Divider />

                        <ToggleSetting
                            title="New assignments"
                            description="Get notified when an outage is assigned to you."
                            checked={notifications.assignments}
                            onChange={(value) =>
                                updateNotification('assignments', value)
                            }
                        />

                        <Divider />

                        <ToggleSetting
                            title="Restoration updates"
                            description="Receive updates when restoration tasks change status."
                            checked={notifications.restoration}
                            onChange={(value) =>
                                updateNotification('restoration', value)
                            }
                        />

                        <Divider />

                        <ToggleSetting
                            title="System announcements"
                            description="Receive important GridCare service announcements."
                            checked={notifications.announcements}
                            onChange={(value) =>
                                updateNotification('announcements', value)
                            }
                        />
                    </SettingsCard>

                    {/* Appearance */}
                    <SettingsCard
                        icon={<Monitor />}
                        title="Appearance"
                        description="Personalize how your dashboard looks."
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-800">
                                Dashboard theme
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Choose your preferred display mode.
                            </p>

                            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {[
                                    {
                                        value: 'light',
                                        label: 'Light',
                                        icon: <Sun className="h-5 w-5" />,
                                    },
                                    {
                                        value: 'dark',
                                        label: 'Dark',
                                        icon: <Moon className="h-5 w-5" />,
                                    },
                                    {
                                        value: 'system',
                                        label: 'System',
                                        icon: <Monitor className="h-5 w-5" />,
                                    },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => {
                                            setAppearance(item.value);
                                            setSaved(false);
                                        }}
                                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                                            appearance === item.value
                                                ? 'border-[#0055B8] bg-blue-50/70 text-[#0055B8] ring-1 ring-[#0055B8]/20'
                                                : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                    >
                                        {item.icon}
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>
                                        {appearance === item.value && (
                                            <Check className="ml-auto h-4 w-4" />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                Theme selection is currently local to this page.
                                Connect it to your application's theme provider
                                to apply it across the dashboard.
                            </p>
                        </div>

                        <Divider />

                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 shrink-0 text-slate-400" />
                            <div className="min-w-0 flex-1">
                                <label
                                    htmlFor="language"
                                    className="text-sm font-medium text-slate-800"
                                >
                                    Language
                                </label>
                                <p className="mt-1 text-xs text-slate-500">
                                    Select your preferred language.
                                </p>
                            </div>

                            <select
                                id="language"
                                value={language}
                                onChange={(event) => {
                                    setLanguage(event.target.value);
                                    setSaved(false);
                                }}
                                className="max-w-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0055B8] focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="en">English</option>
                                <option value="bn">বাংলা</option>
                            </select>
                        </div>
                    </SettingsCard>
                </div>

                {/* Security Sidebar */}
                <div className="space-y-6">
                    <SettingsCard
                        icon={<LockKeyhole />}
                        title="Security"
                        description="Protect your technician account."
                    >
                        <ToggleSetting
                            title="Two-factor authentication"
                            description="Add another layer of protection to your account."
                            checked={preferences.twoFactor}
                            onChange={(value) =>
                                updatePreference('twoFactor', value)
                            }
                        />

                        <Divider />

                        <div className="space-y-3 py-1">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                                    <KeyRound className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">
                                        Password
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Keep your password secure.
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value="example-password"
                                    readOnly
                                    aria-label="Current password placeholder"
                                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 pr-10 text-sm text-slate-500"
                                />
                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? 'Hide password placeholder'
                                            : 'Show password placeholder'
                                    }
                                    onClick={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full border-slate-200"
                                onClick={() =>
                                    window.alert(
                                        'Connect your change-password page or dialog here.',
                                    )
                                }
                            >
                                Change Password
                            </Button>
                        </div>
                    </SettingsCard>

                    {/* Contact Preferences */}
                    <SettingsCard
                        icon={<Smartphone />}
                        title="Contact Preferences"
                        description="Keep your communication details current."
                    >
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-800">
                                        Email
                                    </p>
                                    <p className="mt-1 break-all text-xs text-slate-500">
                                        Update your email from your profile.
                                    </p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full border-slate-200"
                                onClick={() =>
                                    window.alert(
                                        'Connect your profile edit page here.',
                                    )
                                }
                            >
                                Manage Profile
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </SettingsCard>

                    {/* Danger Zone */}
                    <section className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                <Trash2 className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    Danger Zone
                                </h3>
                                <p className="mt-1 text-xs text-slate-500">
                                    Sensitive account actions
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-slate-600">
                            Need to leave GridCare? Contact your administrator
                            to discuss account deactivation.
                        </p>

                        <Button
                            variant="outline"
                            className="mt-4 w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() =>
                                window.alert(
                                    'Connect your logout handler here.',
                                )
                            }
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </section>
                </div>
            </div>

            {/* Bottom Save */}
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                    <p className="text-sm font-semibold text-slate-800">
                        Ready to save your preferences?
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                        Remember to save your changes before leaving this page.
                    </p>
                </div>

                <Button
                    onClick={handleSave}
                    className="w-full bg-[#0055B8] hover:bg-[#004494] sm:w-auto"
                >
                    <Save className="mr-2 h-4 w-4" />
                    {saved ? 'Changes Saved' : 'Save Preferences'}
                </Button>
            </div>
        </div>
    );
};

const SettingsCard = ({
    icon,
    title,
    description,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}) => (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0055B8]">
                {icon}
            </div>
            <div>
                <h2 className="font-semibold text-slate-900">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                    {description}
                </p>
            </div>
        </div>

        <div className="mt-5 space-y-4">{children}</div>
    </section>
);

const ToggleSetting = ({
    title,
    description,
    checked,
    onChange,
}: ToggleSettingProps) => (
    <div className="flex items-center justify-between gap-4 py-1">
        <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800">{title}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
                {description}
            </p>
        </div>

        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={title}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055B8] focus-visible:ring-offset-2 ${
                checked ? 'bg-[#0055B8]' : 'bg-slate-300'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    checked ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    </div>
);

const Divider = () => <div className="border-t border-slate-100" />;

export default TechnicianSettings;
