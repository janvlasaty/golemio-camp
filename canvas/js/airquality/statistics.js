var AirqualityStatistics = new Statistics('airquality')

AirqualityStatistics.addFrame(
    {
        id: 'CHMI',
        position: {
            x: 1950,
            y: 300,
        }
    }
)

AirqualityStatistics.addFrame(
    {
        id: 'Karlin',
        position: {
            x: 6600,
            y: 750,
        }
    }
)

AirqualityStatistics.addStatistic(
    {
        active: true,
        id: 'CHMIName',
        frame: 'CHMI',
        classList: ['text-red-grad'],
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 700
        },
        data: {
            type: 'text',
        },
        options: {
            text: 'PRAHA',
            title: 'ADRESA'
        },
    }
)


AirqualityStatistics.addStatistic(
    {
        active: true,
        id: 'KarlinCount',
        frame: 'Karlin',
        classList: ['text-red-grad'],
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
            title: 'POČET SENSORŮ'
        },
    }
)

AirqualityStatistics.render()