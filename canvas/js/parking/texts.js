var ParkingTexts = new Texts('parking')

ParkingTexts.add({
    id: 'parkingInfo',
    position: {
        // x: 5380,CAMP
        x: 5530,
        y: 380,
    },
    width: 500,
    data: {
        type: 'headerPlusInfo',
        header: 'P+R Parking',
        paragraph: `In Prague there is regulated
        on-street parking in downtown 
        and a few other districts called
        parking zones.<br>
        They are a few types for residents
        only, for visitors only, and mixed one.
        Residents can buy long term card,
        visitors can buy short term tickets.`
    }
})
ParkingTexts.add({
    id: 'additionalParkingInfo',
    position: {
        x: 5460, // CAMP
        // x: 5610,
        y: 850,
    },
    width: 500,
    data: {
        type: 'header2',
        header: 'ADDITIONAL INFORMATION',
    },
})
ParkingTexts.add({
    id: 'AverageOccupancy',
    position: {
        x: 6410,  // CAMP
        // x: 6560,
        y: 20, // CAMP
        // y: 50,
    },
    width: 500,
    data: {
        type: 'header2',
        header: 'AVERAGE OCCUPANCY',
    },
})

ParkingTexts.render()