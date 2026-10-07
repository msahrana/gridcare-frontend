'use client';

import { CalendarDays, Clock, Info, MapPin } from 'lucide-react';

import { useSuspenseGetUpcomingLoadSheddingSchedule } from '@/hooks';

const UpcomingLoadSheddingSchedules = () => {
    const { data } = useSuspenseGetUpcomingLoadSheddingSchedule();
    const schedules = data?.data ?? [];

    return (
        <div className="space-y-6 ml-5 mt-5">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Upcoming Load Shedding Schedules
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Stay informed about load shedding schedules in your area.
                </p>
            </div>

            {/* Empty State */}
            {schedules.length === 0 ? (
                <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border bg-card p-8 text-center shadow-sm">
                    <div className="mb-4 rounded-full bg-muted p-4">
                        <CalendarDays className="size-8 text-muted-foreground" />
                    </div>

                    <h2 className="text-lg font-semibold">
                        No Load Shedding Schedules
                    </h2>

                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                        There are currently no load shedding schedules available
                        for your area.
                    </p>
                </div>
            ) : (
                /* Schedule Cards */
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {schedules.map((schedule) => {
                        const startDate = new Date(schedule.startTime);
                        const endDate = new Date(schedule.endTime);

                        return (
                            <div
                                key={schedule.id}
                                className="group rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                {/* Title & Status */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <h2 className="line-clamp-2 font-semibold">
                                            {schedule.title}
                                        </h2>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {schedule.area?.name}
                                        </p>
                                    </div>

                                    <span
                                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                                            schedule.status === 'COMPLETED'
                                                ? 'bg-green-100 text-green-700'
                                                : schedule.status === 'ACTIVE'
                                                  ? 'bg-red-100 text-red-700'
                                                  : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {schedule.status}
                                    </span>
                                </div>

                                {/* Description */}
                                {schedule.description && (
                                    <div className="mt-4 flex gap-3 rounded-lg bg-muted/50 p-3">
                                        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {schedule.description}
                                        </p>
                                    </div>
                                )}

                                {/* Schedule Information */}
                                <div className="mt-5 space-y-4">
                                    {/* Date */}
                                    <div className="flex items-start gap-3">
                                        <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Date
                                            </p>

                                            <p className="text-sm font-medium">
                                                {startDate.toLocaleDateString(
                                                    'en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    },
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-start gap-3">
                                        <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Load Shedding Time
                                            </p>

                                            <p className="text-sm font-medium">
                                                {startDate.toLocaleTimeString(
                                                    'en-US',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    },
                                                )}{' '}
                                                -{' '}
                                                {endDate.toLocaleTimeString(
                                                    'en-US',
                                                    {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    },
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Area */}
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">
                                                Area
                                            </p>

                                            <p className="text-sm font-medium">
                                                {schedule.area?.name}
                                            </p>

                                            {schedule.area?.address && (
                                                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                                                    {schedule.area.address}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UpcomingLoadSheddingSchedules;
