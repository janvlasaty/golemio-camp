var SharingStatistics = new Statistics('sharing')

SharingStatistics.addFrame(
    {
        id: 'numbers',
        position: {
            x: 1700,
            y: 400,
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
            title: 'AUT K DISPOZICI'
        },
    }
)

SharingStatistics.addFrame(
    {
        id: 'bikenumbers',
        position: {
            x: 1700,
            y: 800,
        }
    }
)

SharingStatistics.addStatistic(
    {
        active: true,
        id: 'BikeCountAvailable',
        frame: 'bikenumbers',
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
            title: 'KOL K DISPOZICI'
        },
    }
)

SharingStatistics.render()