var ParkingStatistics = new Statistics('parking')

ParkingStatistics.addFrame(
    {
        id: 'detail',
        position: {
            // x: 5300, //CAMP
            // x: 5450,
            x: 1970,
            y: 1860,
        }
    }
)

ParkingStatistics.addFrame(
    {
        id: 'overall',
        position: {
            // x: 2350,
            x: 150,
            y: 350,
        }
    }
)

ParkingStatistics.addStatistic(
    {
        active: true,
        id: 'parkingCapacity',
        frame: 'detail',
        classList: ['text-blue-grad'],
        position: {
            x: 200,
            y: 0,
        },
        size: {
            width: 200
        },
        data: {
          type: 'number',
          source: 'parkingCapacity'
        },
        options: {
            value: 0,
            decimalPlaces: 0,
            title: 'KAPACITA PARKOVIŠTĚ',
        },
    }
)

ParkingStatistics.addStatistic(
    {
        active: true,
        id: 'parkingName',
        frame: 'detail',
        classList: ['text-blue-grad'],
        position: {
            x: 500,
            y: 0,
        },
        size: {
            width: 340
        },
        data: {
            type: 'text',
          source: 'parkingName'
        },
        options: {
            text: 'Parking',
            title: 'NÁZEV PARKOVIŠTĚ'
        },
    }
)

ParkingStatistics.addStatistic(
    {
        active: true,
        id: 'parkingLotsCount',
        frame: 'overall',
        classList: ['text-white-grad'],
        position: {
            x: 0,
            y: 0,
        },
        size: {
            width: 340
        },
        data: {
            type: 'number',
          source: 'parkingLotsCount'
        },
        options: {
            value: 0,
            decimalPlaces: 0,
            title: 'POČET PARKOVIŠŤ'
        },
    }
)

ParkingStatistics.addStatistic(
    {
        active: true,
        id: 'parkingSpacesCount',
        frame: 'overall',
        type: 'number',
        classList: ['text-white-grad'],
        position: {
            x: 0,
            y: 300,
        },
        size: {
            width: 340
        },
        data: {
            type: 'number',
          source: 'parkingSpacesCount'
        },
        options: {
            value: 0,
            decimalPlaces: 0,
            title: 'POČET STÁNÍ'
        },
    }
)

ParkingStatistics.addStatistic(
    {
        active: false,
        id: 'countRationActual',
        frame: 'overall',
        type: 'number',
        classList: ['text-white-grad'],
        position: {
            x: 0,
            y: 400,
        },
        size: {
            width: 340
        },
        data: {
            type: 'number',
          source: 'parkingSpacesCount'
        },
        options: {
            value: 0,
            decimalPlaces: 0,
            title: 'NÁZEV PARKOVIŠTĚ'
        },
    }
)

ParkingStatistics.renderFrames()
ParkingStatistics.renderStatistics()