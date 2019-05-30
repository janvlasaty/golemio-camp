var TransportTexts = new Texts('transport')

TransportTexts.add({
    id: 'transportInfo',
    position: {
        x: 6500,
        y: 250,
    },
    width: 500,
    data: {
        type: 'headerPlusInfo',
        header: 'Public transport',
        paragraph: `ROPID - Regional Organizer of Prague Integrated Transport, 
        was established by Prague city council with the aim to create a modern integrated public transport system in the capital of Czech Republic and its surroundings. 
        <br>
        They provide realtime information about buses positions and delays for every transport carriers excluding DPP - The Prague Public Transit Co.`
    }
})


TransportTexts.render()