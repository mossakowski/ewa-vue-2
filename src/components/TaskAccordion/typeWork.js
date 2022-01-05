export default [
        {
            name: 'serwis',
            data: [
                { name: 'Serwis', type: 'serwis', togglePaid: true, toggleNewClient: false, newClient: undefined, paidCost : '0'},
                { name: 'Awaria', type: 'serwis', togglePaid: true, toggleNewClient: false, newClient: undefined, paidCost : '0' },
                { name: 'Przedłużenie umowy', type: 'serwis', togglePaid: true, toggleNewClient: false, newClient: undefined, paidCost : '0' }
            ]              
        },
        {
            name: 'instalacje',
            data : [
                { name: 'Instalacja Światłowodowa', type: 'installation', togglePaid: true, toggleNewClient: true, newClient: true, paidCost : '0' },
                { name: 'Instalacja Radiowa', type: 'installation', togglePaid: true, toggleNewClient: true, newClient: true, paidCost : '0' },
                { name: 'Instalacja Blok', type: 'installation', togglePaid: true, toggleNewClient: true, newClient: true, paidCost : '0' },
                { name: 'Instalacja Zbiorcza', type: 'installation', togglePaid: true, toggleNewClient: true, newClient: true, paidCost : '0' },
                { name: 'Instalacja TV', type: 'installation', togglePaid: true, toggleNewClient: false, newClient: true, paidCost : '0' },
            ]
        },
        {
            name: 'networkBulding',
            data : [
                { name: 'Budowa sieci', type: 'network-bulding', togglePaid: false, toggleNewClient: false, newClient: undefined, paidCost : undefined },
                { name: 'Przebudowa sieci', type: 'network-bulding', togglePaid: false, toggleNewClient: false, newClient: undefined, paidCost : undefined },
                { name: 'Wywiad techniczny (napisz czy są możliwości)', type: 'network-bulding', togglePaid: false, toggleNewClient: false, newClient: undefined, paidCost : undefined },
            ]              
        },
        {
            name: 'office',
            data : [
                { name: 'Prace biurowe', type: 'office-working', togglePaid: false, toggleNewClient: false, newClient: undefined, paidCost : undefined },
                { name: 'Sprzątanie', type: 'office-working', togglePaid: false, toggleNewClient: false, newClient: undefined, paidCost : undefined },
                { name: 'Inne', type: 'office-working', togglePaid: false, toggleNewClient: false, newClient: undefined, paidCost : undefined },
            ]              
        },
]