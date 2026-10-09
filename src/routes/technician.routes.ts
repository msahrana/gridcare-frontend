const prefix = '/technician';

export const technicianRoutes = [
    {
        title: 'Overview',
        items: [
            {
                title: 'Technician Dashboard',
                url: `${prefix}`,
            },
            {
                title: 'Technician Assignments',
                url: `${prefix}/outageAssignments`,
            },
            {
                title: 'Outage Reports',
                url: `${prefix}/outageReports`,
            },
            {
                title: 'Restorations',
                url: `${prefix}/restorations`,
            },
            {
                title: 'Outages',
                url: `${prefix}/outages`,
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
