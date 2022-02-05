export default [{
        name: 'serwis',
        data: [{
                nameTask: 'Serwis',
                typeTask: 'service',
                togglePaid: true,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: '0'
            },
            {
                nameTask: 'Awaria',
                typeTask: 'accident',
                togglePaid: true,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: '0'
            },
            {
                nameTask: 'Przedłużenie umowy',
                typeTask: 'service',
                togglePaid: true,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: '0'
            }
        ]
    },
    {
        name: 'instalacje',
        data: [{
                nameTask: 'Instalacja Światłowodowa',
                typeTask: 'installation-fiber',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                nameTask: 'Instalacja Radiowa',
                typeTask: 'installation-radio',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                nameTask: 'Instalacja Blok',
                typeTask: 'installation-fiber',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                nameTask: 'Instalacja Zbiorcza',
                typeTask: 'installation-fiber',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                nameTask: 'Instalacja TV',
                typeTask: 'installation-fiber',
                togglePaid: true,
                toggleNewClient: false,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
        ]
    },
    {
        name: 'networkBulding',
        data: [{
                nameTask: 'Budowa sieci',
                typeTask: 'network-bulding',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                nameTask: 'Przebudowa sieci',
                typeTask: 'network-bulding',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                nameTask: 'Wywiad techniczny (napisz czy są możliwości)',
                typeTask: 'network-bulding',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
        ]
    },
    {
        name: 'office',
        data: [{
                nameTask: 'Prace biurowe',
                typeTask: 'office-working',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                nameTask: 'Sprzątanie',
                typeTask: 'office-working',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                nameTask: 'Inne',
                typeTask: 'office-working',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
        ]
    },
]