var WasteTexts = new Texts('waste')

WasteTexts.add({
    id: 'wasteInfo',
    position: {
        x: 5950,
        y: 500,
    },
    width: 500,
    data: {
        type: 'headerPlusInfo',
        header: 'Waste',
        paragraph: `More then 400 ultrasonic sensors measuring the waste level in containers just now. 
        IoT devices are connected by Lora and Sigfox network and sending data 6 times per day.<br>
        It helps to optimization of waste collection routes, pick-up frequencies, and vehicle loads.`
    }
})

WasteTexts.add({
    id: 'picksUnder50Title',
    position: {
        x: 6550,
        y: 900,
    },
    width: 500,
    data: {
        type: 'header2',
        header: 'PICKS DONE OF CONTAINER<br>LESS THAN 50% FULL',
        align: 'center',
    }
})

WasteTexts.render()