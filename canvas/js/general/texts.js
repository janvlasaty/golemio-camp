var GeneralTexts = new Texts('general')

GeneralTexts.add({
    id: 'generalInfo',
    position: {
        x: 6000,
        y: 380,
    },
    width: 700,
    data: {
        type: 'headerPlusInfo',
        header: 'Data Platform<br>Golemio',
        paragraph: `Prague Data Platform focus on data areas with direct links to the specific needs of Prague, its citizens and its visitors.<br>
            The main goal of the project is to enable continuous improvement in the quality of life, and for this it is essential that the city understands 
            its data and is capable of effectively utilising them.`
    }
})

GeneralTexts.render()