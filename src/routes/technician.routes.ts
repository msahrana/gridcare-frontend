const prefix = '/technician';

export const technicianRoutes = [
    {
        title: 'Overview',
        items: [
            {
                title: 'Dashboard',
                url: `${prefix}`,
            },
            {
                title: 'My Schedule',
                url: `${prefix}/schedules`,
            },
        ],
    },

    {
        title: 'Patients',
        items: [
            {
                title: 'My Patients',
                url: `${prefix}/patients`,
            },
            {
                title: 'Medical Records',
                url: `${prefix}/medical-records`,
            },
        ],
    },
    {
        title: 'Clinical',
        items: [
            {
                title: 'Prescriptions',
                url: `${prefix}/prescriptions`,
            },
            {
                title: 'Consultations',
                url: `${prefix}/consultations`,
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
