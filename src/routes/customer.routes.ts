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
                url: `${prefix}/my-subscriptions`,
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
