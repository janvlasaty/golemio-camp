var SharingTexts = new Texts('sharing')

SharingTexts.add({
    id: 'carsharingInfo',
    position: {
        x: 900,
        y: 20,
    },
    width: 500,
    data: {
        type: 'headerPlusInfo',
        header: 'Carsharing',
        paragraph: `There are several carsharing systems operating in Prague, offering short or long-term car rental service for commuting or occasional driving as an alternative to owning a car. They offer a wide range of car models of various class, manufacturers and fuel type. Some of the cars are owned by the companies, others are privately owned by the people. Have a look at the current offer of available cars.`
    }
})
SharingTexts.add({
    id: 'bikesharingInfo',
    position: {
        x: 5600,
        y: 20,
    },
    width: 500,
    data: {
        type: 'headerPlusInfo',
        header: 'Bikesharing',
        paragraph: `Shared bikes have become a popular mobility service with Prague people. There are several companies providing docked or dockless bikesharing systems, offering several types of bicycles including e-bikes. These bikes offer an enjoyable way to go arround the city, but also play an important role in the overall city transportation system, especially for short distance journeys arround transportation hubs.`
    }
})

SharingTexts.render()