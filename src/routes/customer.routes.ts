const prefix = '/customer';

export const customerRoutes = [
    {
        title: 'Bookings',
        items: [
            {
                title: 'Overview',
                url: `${prefix}`,
            },
            {
                title: 'My Subscriptions',
                url: `${prefix}/my-subscription`,
            },
            {
                title: 'History',
                url: `${prefix}/history`,
            },
            {
                title: 'All Outage Reports',
                url: `${prefix}/getAllOutageReports`,
            },
            {
                title: 'Upcoming Load Shedding',
                url: `${prefix}/upcoming-load-shedding-schedules`,
            },
        ],
    },

    {
        title: 'Account',
        items: [
            {
                title: 'Profile',
                url: `${prefix}/profile`,
            },
            {
                title: 'Settings',
                url: `${prefix}/settings`,
            },
        ],
    },
];
