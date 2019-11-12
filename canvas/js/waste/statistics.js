var WasteStatistics = new Statistics('waste')

WasteStatistics.addFrame(
    {
        id: 'actualStation',
        position: {
            x: 200,
            y: 0,
        }
    }
)

WasteStatistics.addStatistic(
    {
        active: true,
        id: 'stationAddress',
        frame: 'actualStation',
        classList: ['text-green-grad'],
        position: {
            x: -100,
            y: 150,
        },
        size: {
            width: 700
        },
        data: {
            type: 'text',
        },
        options: {
            text: 'ADDRESS',
            title: 'ADRESA'
        },
    }
)

WasteStatistics.addStatistic(
    {
        active: true,
        id: 'daysToPick',
        frame: 'actualStation',
        classList: ['text-green-grad'],
        position: {
            x: 0,
            y: 350,
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
            title: 'PŘÍŠTÍ SVOZ [DNY]'
        },
    }
)


WasteStatistics.addStatistic(
    {
        active: true,
        id: 'typeToPick',
        frame: 'actualStation',
        classList: ['text-green-grad'],
        position: {
            x: 0,
            y: 550,
        },
        size: {
            width: 500
        },
        data: {
            type: 'text',
        },
        options: {
            text: 'some',
            title: 'PŘÍŠTÍ SVOZ [TYP]'
        },
    }
)


WasteStatistics.addFrame(
    {
        id: 'statisticCounts',
        position: {
            x: 5950,
            y: 100,
        }
    }
)
WasteStatistics.addStatistic(
    {
        active: true,
        id: 'stationsCount',
        frame: 'statisticCounts',
        classList: ['text-white-grad'],
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
            title: 'STANOVIŠTĚ'
        },
    }
)
WasteStatistics.addStatistic(
    {
        active: true,
        id: 'stationsSensoredCount',
        frame: 'statisticCounts',
        classList: ['text-green-grad'],
        position: {
            x: 500,
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
            title: 'MĚŘENÉ STANOVIŠTĚ'
        },
    }
)
WasteStatistics.addStatistic(
    {
        active: true,
        id: 'containersCount',
        frame: 'statisticCounts',
        classList: ['text-white-grad'],
        position: {
            x: 0,
            y: 200,
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
            title: 'POČET KONTEJNERŮ'
        },
    }
)
WasteStatistics.addStatistic(
    {
        active: true,
        id: 'containersSensoredCount',
        frame: 'statisticCounts',
        classList: ['text-green-grad'],
        position: {
            x: 500,
            y: 200,
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
            title: 'MĚŘENÉ KONTEJNERY'
        },
    }
)


WasteStatistics.render()