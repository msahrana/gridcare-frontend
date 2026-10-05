const prefix = '/admin';

export const adminRoutes = [
    {
        title: 'Management',
        items: [
            {
                title: 'Overview',
                url: `${prefix}`,
            },
            {
                title: 'Technician Approval',
                url: `${prefix}/approve-technician`,
            },
        ],
    },
    {
        title: 'Schedule & Subscriptions',
        items: [
            {
                title: 'Zones',
                url: `${prefix}/zones`,
            },
            {
                title: 'Substations',
                url: `${prefix}/substations`,
            },
            {
                title: 'Feeders',
                url: `${prefix}/feeders`,
            },
            {
                title: 'Areas',
                url: `${prefix}/areas`,
            },
            {
                title: 'Outages',
                url: `${prefix}/outages`,
            },

            {
                title: 'Outage Assignments',
                url: `${prefix}/outageAssignments`,
            },
            {
                title: 'Load Shedding Schedules',
                url: `${prefix}/load-shedding-schedules`,
            },
            {
                title: 'Notifications',
                url: `${prefix}/notifications`,
            },
            {
                title: 'Audit Logs',
                url: `${prefix}/audit-logs`,
            },
            {
                title: 'Restorations',
                url: `${prefix}/restorations`,
            },
            {
                title: 'Automated Schedules',
                url: `${prefix}/automated-schedules`,
            },
        ],
    },
    {
        title: 'Finance & Reports',
        items: [
            {
                title: 'Outage Reports',
                url: `${prefix}/outageReports`,
            },
            {
                title: 'Analytics',
                url: `${prefix}/analytics`,
            },
        ],
    },
];
