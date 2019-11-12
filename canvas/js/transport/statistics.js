var TransportStatistics = new Statistics('transport')

TransportStatistics.addFrame(
    {
        id: 'statisticCounts',
        position: {
            x: 3100,
            y: 1500,
        }
    }
)
TransportStatistics.addStatistic(
    {
        active: true,
        id: 'vehicleCount',
        frame: 'statisticCounts',
        classList: ['text-orange-grad'],
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 500
        },
        data: {
            type: 'number',
        },
        options: {
            value: 0,
            decimalPlaces: 0,
            title: 'SLEDOVANÁ VOZIDLA'
        },
    }
)

TransportStatistics.addStatistic(
    {
        active: true,
        id: 'averageDelay',
        frame: 'statisticCounts',
        classList: ['text-orange-grad'],
        position: {
            x: 0,
            y: 250,
        },
        size: {
            width: 500
        },
        data: {
            type: 'number',
        },
        options: {
            value: 0,
            decimalPlaces: 1,
            title: 'PRŮMĚRNÉ ZPOŽDĚNÍ [min]'
        },
    }
)


TransportStatistics.addFrame(
    {
        id: 'statisticOne',
        position: {
            x: 1050,
            y: 1500,
        }
    }
)
TransportStatistics.addStatistic(
    {
        active: true,
        id: 'alias',
        frame: 'statisticOne',
        classList: ['text-orange-grad'],
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 500
        },
        data: {
            type: 'text',
        },
        options: {
            text: '',
            title: 'ČÍSLO LINKY'
        },
    }
)

TransportStatistics.addStatistic(
    {
        active: true,
        id: 'delay',
        frame: 'statisticOne',
        classList: ['text-orange-grad'],
        position: {
            x: 0,
            y: 250,
        },
        size: {
            width: 500
        },
        data: {
            type: 'number',
        },
        options: {
            value: 0,
            decimalPlaces: 1,
            title: 'AKTUÁLNÍ ZPOŽDĚNÍ [min]'
        },
    }
)

TransportStatistics.render()