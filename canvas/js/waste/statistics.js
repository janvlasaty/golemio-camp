var WasteStatistics = new Statistics('waste')

WasteStatistics.addFrame(
    {
        id: 'actualStation',
        position: {
            x: 850,
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
            x: 0,
            y: 150,
        },
        size: {
            width: 500
        },
        data: {
            type: 'text',
        },
        options: {
            text: 'ADDRESS',
            title: 'ADDRESS'
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
            title: 'NEXT PICK IN DAYS'
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
            title: 'NEXT PICK WASTE TYPE'
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
            title: 'ALL STATIONS'
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
            title: 'SENSORED STATIONS'
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
            title: 'ALL CONTAINERS'
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
            title: 'SENSORED CONTAINERS'
        },
    }
)


WasteStatistics.render()