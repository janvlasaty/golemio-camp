var AirqualityTexts = new Texts('airquality')

AirqualityTexts.add({
    id: 'CHMIInfo',
    position: {
        x: 900,
        y: 20,
    },
    width: 500,
    data: {
        type: 'headerPlusInfo',
        header: 'CHMI stations',
        paragraph: `In Prague there is regulated
        on-street parking in downtown 
        and few other districts called
        parking zones.<br>
        They are few type, for residents
        only, for visitors only, and mixed.
        Residents can buy long-term card,
        visitors buy short-term tickets.`
    }
})
AirqualityTexts.add({
    id: 'KarlinInfo',
    position: {
        x: 6600,
        y: 20,
    },
    width: 500,
    data: {
        type: 'headerPlusInfo',
        header: 'Karlin sensor network',
        paragraph: `In Prague there is regulated
        on-street parking in downtown 
        and few other districts called
        parking zones.<br>
        They are few type, for residents
        only, for visitors only, and mixed.
        Residents can buy long-term card,
        visitors buy short-term tickets.`
    }
})

AirqualityTexts.render()