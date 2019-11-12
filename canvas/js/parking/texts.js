var ParkingTexts = new Texts('parking')

// ParkingTexts.add({
//     id: 'parkingInfo',
//     position: {
//         // x: 5380,CAMP
//         x: 3050,
//         y: 380,
//     },
//     width: 500,
//     data: {
//         type: 'headerPlusInfo',
//         header: 'P+R Parking',
//         paragraph: `In Prague there is regulated
//         on-street parking in downtown 
//         and a few other districts called
//         parking zones.<br>
//         They are a few types for residents
//         only, for visitors only, and mixed one.
//         Residents can buy long term card,
//         visitors can buy short term tickets.`
//     }
// })
// ParkingTexts.add({
//     id: 'additionalParkingInfo',
//     position: {
//         x: 3050, // CAMP
//         // x: 5610,
//         y: 500,
//     },
//     width: 500,
//     data: {
//         type: 'header2',
//         header: 'ADDITIONAL INFORMATION',
//     },
// })
ParkingTexts.add({
    id: 'AverageOccupancy',
    position: {
        x: 3050,  // CAMP
        // x: 6560,
        y: 480, // CAMP
        // y: 50,
    },
    width: 500,
    data: {
        type: 'header2',
        header: 'PRŮMĚRNÁ OBSAZENOST',
    },
})

ParkingTexts.render()