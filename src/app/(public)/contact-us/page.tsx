import {
    Clock3,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    Send,
    ShieldCheck,
    Zap,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
    {
        icon: Phone,
        title: 'Phone',
        value: '+880 1700-000000',
        description: 'Available for general support and inquiries.',
        href: 'tel:+8801700000000',
    },
    {
        icon: Mail,
        title: 'Email',
        value: 'support@gridcare.com',
        description: 'Send us your questions and service requests.',
        href: 'mailto:support@gridcare.com',
    },
    {
        icon: MapPin,
        title: 'Office',
        value: 'Rangpur, Bangladesh',
        description: 'Our operations and support center.',
        href: '#location',
    },
    {
        icon: Clock3,
        title: 'Support Hours',
        value: '24/7 Monitoring',
        description: 'Power service monitoring is available around the clock.',
        href: '#support',
    },
];

const supportTopics = [
    'Power outage reporting',
    'Load-shedding information',
    'Technician support',
    'Account and subscription',
    'Technical assistance',
    'General inquiries',
];

const ContactPage = () => {
    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden border-b bg-linear-to-br from-sky-50 via-background to-blue-50 dark:from-slate-950 dark:via-background dark:to-blue-950/30">
                <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />

                <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge
                            variant="secondary"
                            className="mb-5 gap-2 px-4 py-2"
                        >
                            <MessageSquare className="h-4 w-4 text-sky-600" />
                            Get in Touch
                        </Badge>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            We&apos;re Here to
                            <span className="block text-sky-600">
                                Help You Stay Connected.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                            Have a question about GridCare, need technical
                            support, or want to learn more about our smart power
                            management platform? Our team is ready to help.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="container mx-auto px-4 py-14 sm:px-6 lg:py-20">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {contactInfo.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Card
                                key={item.title}
                                className="group transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
                            >
                                <CardContent className="p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 transition-colors group-hover:bg-sky-600 group-hover:text-white dark:bg-sky-950">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <p className="mt-5 text-sm font-medium text-muted-foreground">
                                        {item.title}
                                    </p>

                                    <Link
                                        href={item.href}
                                        className="mt-1 block font-semibold transition-colors hover:text-sky-600"
                                    >
                                        {item.value}
                                    </Link>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Main Contact Area */}
            <section className="bg-muted/30">
                <div className="container mx-auto px-4 py-20 sm:px-6 lg:py-24">
                    <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr]">
                        {/* Contact Form */}
                        <Card className="shadow-sm">
                            <CardHeader className="border-b">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950">
                                        <Send className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <CardTitle>Send Us a Message</CardTitle>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Fill out the form and our team will
                                            get back to you.
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6 sm:p-8">
                                <form className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                Full Name
                                            </Label>

                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                Email Address
                                            </Label>

                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">
                                                Phone Number
                                            </Label>

                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+880 1XXXXXXXXX"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">
                                                Subject
                                            </Label>

                                            <Input
                                                id="subject"
                                                name="subject"
                                                placeholder="How can we help?"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>

                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us how we can help you..."
                                            className="min-h-36 resize-none"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4">
                                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                                        <p className="text-xs leading-5 text-muted-foreground">
                                            Your information is handled securely
                                            and is only used to respond to your
                                            request.
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full sm:w-auto"
                                    >
                                        Send Message
                                        <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Support Information */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950">
                                        <Zap className="h-5 w-5" />
                                    </div>

                                    <CardTitle className="pt-2">
                                        How Can We Help?
                                    </CardTitle>

                                    <p className="text-sm leading-6 text-muted-foreground">
                                        Contact our team for assistance with
                                        GridCare and power service management.
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-3">
                                        {supportTopics.map((topic) => (
                                            <div
                                                key={topic}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="h-1.5 w-1.5 rounded-full bg-sky-600" />

                                                <span className="text-sm text-muted-foreground">
                                                    {topic}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-sky-200 bg-linear-to-br from-sky-600 to-blue-700 text-white">
                                <CardHeader>
                                    <CardTitle className="text-white">
                                        Need Immediate Assistance?
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <p className="text-sm leading-6 text-sky-50">
                                        For active power outages or urgent
                                        service issues, use the outage reporting
                                        system to submit a report directly to
                                        the appropriate operations team.
                                    </p>

                                    <Button
                                        variant="secondary"
                                        className="mt-6"
                                    >
                                        <Link href="/report-outage">
                                            <span className="flex">
                                                Report an Outage
                                                <Zap className="ml-2 h-4 w-4" />
                                            </span>
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location / Support */}
            <section
                id="location"
                className="container mx-auto px-4 py-20 sm:px-6 lg:py-24"
            >
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                    <div>
                        <Badge variant="outline" className="mb-4">
                            Our Support Center
                        </Badge>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Reliable support when you need it
                        </h2>

                        <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                            GridCare is designed around reliable communication
                            and responsive support. Whether you are a customer,
                            technician, operator, or administrator, our platform
                            helps you stay connected.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950">
                                    <MapPin className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        GridCare Operations Center
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Rangpur, Bangladesh
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950">
                                    <Clock3 className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Service Monitoring
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        24 hours a day, 7 days a week
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950">
                                    <Mail className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-semibold">
                                        Email Support
                                    </h3>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        support@gridcare.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <Card className="overflow-hidden">
                        <div className="flex min-h-90 items-center justify-center bg-slate-100 dark:bg-slate-900">
                            <div className="text-center">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-950">
                                    <MapPin className="h-7 w-7" />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    GridCare Operations Center
                                </h3>

                                <p className="mt-2 text-sm text-muted-foreground">
                                    Rangpur, Bangladesh
                                </p>

                                <Button variant="outline" className="mt-5">
                                    <Link href="#location">View Location</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Bottom CTA */}
            <section id="support" className="border-t bg-muted/30">
                <div className="container mx-auto px-4 py-16 text-center sm:px-6">
                    <Badge variant="secondary">GridCare Support</Badge>

                    <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                        Let&apos;s keep your power operations connected
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                        Have questions about GridCare? Our team is ready to help
                        you find the right solution.
                    </p>

                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <Button size="lg">
                            <Link href="mailto:support@gridcare.com">
                                <span className="flex">
                                    Email Support
                                    <Mail className="ml-2 h-4 w-4" />
                                </span>
                            </Link>
                        </Button>

                        <Button size="lg" variant="outline">
                            <Link href="tel:+8801700000000">
                                <span className="flex">
                                    Call Support
                                    <Phone className="ml-2 h-4 w-4" />
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;
