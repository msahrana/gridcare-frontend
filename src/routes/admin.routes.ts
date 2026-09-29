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
        title: 'Appointments',
        items: [
            {
                title: 'Appointments',
                url: `${prefix}/appointments`,
            },
            {
                title: 'Prescriptions',
                url: `${prefix}/prescriptions`,
            },
            {
                title: 'Medical Records',
                url: `${prefix}/medical-records`,
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
