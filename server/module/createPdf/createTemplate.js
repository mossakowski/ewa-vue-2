module.exports = (dataRaport) => {
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
                //work done
                ul: [

                ]
            },

            {
                text: 'Prace do dokończenia',
                style: 'header',
                margin: [0, 15, 0, 0],
                fontSize: 18,
                bold: true
            },
            {
                //work continues
                ul: [

                ]
            },

            {
                text: 'Prace niezrealizowane',
                style: 'header',
                margin: [0, 15, 0, 0],
                fontSize: 18,
                bold: true
            },
            {
                //work unrealized
                ul: [

                ],
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
                    `Tygodniowy: ${(dataRaport.data.dutyInfo.activeWeek) ? 'TAK' : 'NIE'}`,
                    `Świąteczny: ${(dataRaport.data.dutyInfo.activeHoliday) ? 'TAK' : 'NIE'} ${(dataRaport.data.dutyInfo.holidayRangeDate) ? '(' + dataRaport.data.dutyInfo.holidayRangeDate + ')' : ''} `
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
                                text: '',
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: '',
                                italics: true,
                                alignment: 'center'
                            },
                            {
                                text: '',
                                italics: true,
                                alignment: 'center'
                            }
                        ],
                        [{
                                text: 'Radiowa',
                                alignment: 'center'
                            },
                            {
                                text: '',
                                italics: true,
                                alignment: 'center'
                            }, {
                                text: '',
                                italics: true,
                                alignment: 'center'
                            },
                            {
                                text: '',
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
                                text: '',
                                italics: true,
                                alignment: 'center'
                            },
                        ],
                        [{
                                text: 'Awarii',
                                alignment: 'center'
                            },
                            {
                                text: '',
                                italics: true,
                                alignment: 'center'
                            },
                        ],
                        [{
                                text: 'Budowa sieci',
                                alignment: 'center'
                            },
                            {
                                text: '',
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