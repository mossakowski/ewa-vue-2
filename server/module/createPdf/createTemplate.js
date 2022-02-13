module.exports = (dataRaport) => {
    function newClientInfo(item) {
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
        console.log(dataRaport.data.duty.holidayRangeDate);
        let ulList = [];
        for(let item of dataRaport.data.accordionTask[statusTask]) {
            let ulElArr = [];
            for(let [property, value] of Object.entries(item)) {
                if(property != 'typeTask' && property != 'indexTask' && property != 'togglePaid' && property != 'toggleNewClient' && property != 'paidTask') {
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
        return (ulList.length > 0) ? ulList : ['Brak pozycji'];
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
                                text: dataRaport.data.workerInfo.selectedWorker,
                                alignment: 'center'
                            },
                            {
                                text: `${dataRaport.data.workerInfo.timeDateWork.startWork} - ${dataRaport.data.workerInfo.timeDateWork.endWork} (${dataRaport.data.workerInfo.timeDateWork.durationWork}) ${(dataRaport.data.workerInfo.timeDateWork.late) ? 'SPÓŹNIENIE!' : ''} ${(dataRaport.data.workerInfo.timeDateWork.overtime) ? 'NADGODZINY!' : ''}` ,
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: dataRaport.data.workerInfo.timeDateWork.dateWork,
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
                    `Tygodniowy: ${(dataRaport.data.duty.activeWeek) ? 'TAK' : 'NIE'} ${(dataRaport.data.duty.additionalTimeInLastDuty === '00:00') ? '' :  '(Dodatkowy czas podczas ostatniego dyżuru: ' + dataRaport.data.duty.additionalTimeInLastDuty + ')'}`,
                    `Świąteczny: ${(dataRaport.data.duty.activeHoliday) ? `TAK ${dataRaport.data.duty['holidayRangeDate'].join(' - ')}` : 'NIE'} `,
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
                margin: [0, 0, 0, 0],
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
                                text: dataRaport.summary.fiberInstallation['numberNewClients'],
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: dataRaport.summary.fiberInstallation['numberCurrentClients'],
                                italics: true,
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary.fiberInstallation['numberInstallations'],
                                italics: true,
                                alignment: 'center'
                            }
                        ],
                        [{
                                text: 'Radiowa',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary.radioInstallation['numberNewClients'],
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: dataRaport.summary.radioInstallation['numberCurrentClients'],
                                italics: true,
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary.radioInstallation['numberInstallations'],
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
                                text: dataRaport.summary.services,
                                italics: true,
                                alignment: 'center'
                            },
                        ],
                        [{
                                text: 'Awarii',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary.accidents,
                                italics: true,
                                alignment: 'center'
                            },
                        ],
                        [{
                                text: 'Budowa sieci',
                                alignment: 'center'
                            },
                            {
                                text: dataRaport.summary.networkBulding,
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