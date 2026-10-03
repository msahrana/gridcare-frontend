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
        ],
    },
    {
        title: 'Finance & Reports',
        items: [
            {
                title: 'Payments',
                url: `${prefix}/payments`,
            },
            {
                title: 'Analytics',
                url: `${prefix}/analytics`,
            },
        ],
    },
];
