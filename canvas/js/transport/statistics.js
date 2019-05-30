var TransportStatistics = new Statistics('transport')

TransportStatistics.addFrame(
    {
        id: 'statisticCounts',
        position: {
            x: 5950,
            y: 400,
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
            title: 'MONITORED TRIPS'
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
            title: 'AVERAGE DELAY [min]'
        },
    }
)


TransportStatistics.addFrame(
    {
        id: 'statisticOne',
        position: {
            x: 950,
            y: 400,
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
            title: 'TRIP NUMBER'
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
            title: 'ACTUAL DELAY [min]'
        },
    }
)

TransportStatistics.render()