var SharingStatistics = new Statistics('sharing')

SharingStatistics.addFrame(
    {
        id: 'numbers',
        position: {
            x: 850,
            y: 750,
        }
    }
)

SharingStatistics.addStatistic(
    {
        active: true,
        id: 'CarsCountAvailable',
        frame: 'numbers',
        classList: ['text-purple-grad'],
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
            title: 'AVAILABLE CARS'
        },
    }
)

SharingStatistics.render()