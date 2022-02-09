export default [{
        name: 'serwis',
        data: [{
                name: 'Serwis',
                typeTask: 'service',
                togglePaid: true,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: '0'
            },
            {
                name: 'Awaria',
                typeTask: 'accident',
                togglePaid: true,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: '0'
            },
            {
                name: 'Przedłużenie umowy',
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
                name: 'Instalacja Światłowodowa',
                typeTask: 'installation-fiber',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                name: 'Instalacja Radiowa',
                typeTask: 'installation-radio',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                name: 'Instalacja Blok',
                typeTask: 'installation-fiber',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                name: 'Instalacja Zbiorcza',
                typeTask: 'installation-fiber',
                togglePaid: true,
                toggleNewClient: true,
                newClient: true,
                paidWork: false,
                paidCost: '0'
            },
            {
                name: 'Instalacja TV',
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
                name: 'Budowa sieci',
                typeTask: 'network-bulding',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                name: 'Przebudowa sieci',
                typeTask: 'network-bulding',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                name: 'Wywiad techniczny (napisz czy są możliwości)',
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
                name: 'Prace biurowe',
                typeTask: 'office-working',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                name: 'Sprzątanie',
                typeTask: 'office-working',
                togglePaid: false,
                toggleNewClient: false,
                newClient: undefined,
                paidWork: false,
                paidCost: undefined
            },
            {
                name: 'Inne',
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