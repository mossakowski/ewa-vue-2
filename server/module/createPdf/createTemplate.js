module.exports = (dataRaport) => {
    console.log(dataRaport.data.dutyProperties.holidayRangeDate);
    function newClientInfo(item) {
        console.log(item);
        let clientStatus;
        switch(item) {
            case true:
                clientStatus = 'Nowy klient';
                break;
            case false:
                clientStatus = 'Obecny klient';
                break;
            case undefined:
                clientStatus = '';
                break;                                        
        }
        return clientStatus;
    }

    function paidInfo(cost) {
        if(parseInt(cost) > 0) {
            return `Płatne ${cost} zł`;
        } else {
            return '';
        }
    }

    function createListTask(dataRaport, statusTask) {
        
        let ulList = [];
        for(let item of dataRaport.data[statusTask]) {
            let ulElArr = [];
            for(let [property, value] of Object.entries(item)) {
                if(property != 'typeTask' && property != 'indexTask' && property != 'togglePaid' && property != 'toggleNewClient') {
                    if(property === 'paidCost') {
                        ulElArr.push(paidInfo(value));
                    }
                    else if(property === 'newClient') {
                        ulElArr.push(newClientInfo(value));
                    }
                    else {
                        ulElArr.push(value)
                    }
                }
            }
            ulElArr = ulElArr.filter(item => item);
            let ulEl = ulElArr.join(' - ');
            ulList.push(ulEl);
        }
        return ulList;
    }
    let docDefinition = {
        content: [{
                text: 'RAPORT DZIENNY Z WYKONANYCH PRAC',
                fontSize: 24,
                style: 'header',
                alignment: 'center',
                bold: true
            },
            {
                style: 'tableRaport',
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [{
                                text: 'Pracownik',
                                alignment: 'center'
                            },
                            {
                                text: 'Czas pracy',
                                alignment: 'center'
                            },
                            {
                                text: 'Data',
                                alignment: 'center'
                            }
                        ],
                        [{
                                text: dataRaport.data.selectedWorker,
                                alignment: 'center'
                            },
                            {
                                text: `${dataRaport.data.timeDateWork.startWork} - ${dataRaport.data.timeDateWork.endWork} (${dataRaport.data.timeDateWork.durationWork}) ${(dataRaport.data.timeDateWork.late) ? 'SPÓŹNIENIE!' : ''} ${(dataRaport.data.timeDateWork.overtime) ? 'NADGODZINY!' : ''}` ,
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: dataRaport.data.timeDateWork.dateWork,
                                italics: true,
                                alignment: 'center'
                            }
                        ]
                    ]
                }
            },

            {
                text: 'Prace wykonane',
                style: 'header',
                margin: [0, 15, 0, 0],
                fontSize: 18,
                bold: true
            },
            {
                //done task
                ul: createListTask(dataRaport, 'doneTasks')
            },

            {
                text: 'Prace do dokończenia',
                style: 'header',
                margin: [0, 15, 0, 0],
                fontSize: 18,
                bold: true
            },
            {
                //progress task
                ul: createListTask(dataRaport, 'progressTasks')
            },

            {
                text: 'Prace niezrealizowane',
                style: 'header',
                margin: [0, 15, 0, 0],
                fontSize: 18,
                bold: true
            },
            {
                //not done task
                ul: createListTask(dataRaport, 'unrealizedTasks')
            },
            {
                text: 'Dyżur',
                style: 'header',
                margin: [0, 15, 0, 0],
                fontSize: 18,
                bold: true
            },
            {
                ul: [
                    `Tygodniowy: ${(dataRaport.data.dutyProperties.activeWeek) ? 'TAK' : 'NIE'}`,
                    `Świąteczny: ${(dataRaport.data.dutyProperties.activeHoliday) ? 'TAK' : 'NIE'} ${(dataRaport.data.dutyProperties.holidayRangeDate.length > 0) ? '(' + dataRaport.data.dutyProperties.holidayRangeDate + ')' : ''} `
                ]
            },

            {
                text: 'Podsumowanie',
                margin: [0, 15, 0, 0],
                fontSize: 18,
                bold: true
            },
            {
                text: 'Instalacje',
                margin: [0, 15, 0, 0],
                fontSize: 16,
                bold: true
            },
            {
                style: 'installation',
                table: {
                    widths: ['*', '*', '*', '*'],
                    body: [
                        [{
                                text: 'Instalacja',
                                alignment: 'center'
                            },
                            {
                                text: 'Nowi Klienci',
                                alignment: 'center'
                            },
                            {
                                text: 'Obecni Klienci',
                                alignment: 'center'
                            },
                            {
                                text: 'RAZEM',
                                alignment: 'center'
                            }
                        ],
                        [{
                                text: 'Światłowodowa',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary['numberNewClientFiber'],
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: dataRaport.summary['numberCurrentClientFiber'],
                                italics: true,
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary['numberInstallationFiber'],
                                italics: true,
                                alignment: 'center'
                            }
                        ],
                        [{
                                text: 'Radiowa',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary['numberNewClientRadio'],
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: dataRaport.summary['numberCurrentClientRadio'],
                                italics: true,
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary['numberInstallationRadio'],
                                italics: true,
                                alignment: 'center'
                            }
                        ],
                    ]
                }
            },
            {
                text: 'Inne',
                margin: [0, 15, 0, 0],
                fontSize: 16,
                bold: true
            },
            {
                style: 'tableRaport',
                table: {
                    widths: ['*', '*'],
                    body: [
                        [{
                                text: 'Typ zdarzenia',
                                alignment: 'center'
                            },
                            {
                                text: 'Razem',
                                alignment: 'center'
                            },
                        ],
                        [{
                                text: 'Serwisów',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary['numberService'],
                                italics: true,
                                alignment: 'center'
                            },
                        ],
                        [{
                                text: 'Awarii',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary['numberAccident'],
                                italics: true,
                                alignment: 'center'
                            },
                        ],
                        [{
                                text: 'Budowa sieci',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary['numberNetworkBulding'],
                                italics: true,
                                alignment: 'center'
                            },
                        ],
                    ]
                }
            },

        ]
    };

    return docDefinition;
}