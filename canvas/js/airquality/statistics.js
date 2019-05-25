var AirqualityStatistics = new Statistics('airquality')

AirqualityStatistics.addFrame(
    {
        id: 'CHMI',
        position: {
            x: 900,
            y: 650,
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
            width: 500
        },
        data: {
            type: 'text',
        },
        options: {
            text: '--address--',
            title: 'ADDRESS'
        },
    }
)

AirqualityStatistics.render()