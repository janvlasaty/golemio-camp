class Texts {
    constructor(container) {
        this.container = container
        this.wrapper = document.querySelector('#container-' + container + ' .texts')
        this.texts = []
    }

    add(options) {
        this.texts.push(options)
    }

    render() {
        this.texts.forEach((e,i,a)=>{
            a[i].element = document.createElement('div')
            a[i].element.id = this.container+'-text-'+e.id;
            a[i].element.style.position = 'absolute'
            a[i].element.style.left = e.position.x + 'px'
            a[i].element.style.top = e.position.y + 'px'
            a[i].element.style.width = e.width + 'px'


            switch (e.data.type) {
                case 'headerPlusInfo': 
                    var header = document.createElement('h1')
                    header.innerHTML = e.data.header
                    var paragraph = document.createElement('p')
                    paragraph.innerHTML = e.data.paragraph
                    a[i].element.appendChild(header)
                    a[i].element.appendChild(paragraph)
                    break;
                case 'header2': 
                    var header = document.createElement('h2')
                    header.innerHTML = e.data.header
                    if (e.data.align) 
                        header.style['text-align'] = e.data.align
                    a[i].element.appendChild(header)
                    break;
                default:
                    break;
            } 

            a[i].element.className = 'transparent'
            this.wrapper.appendChild(a[i].element)
        })
    }

    hide(specify = '') {
        this.texts.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('transparent')<0)
                    a[i].element.className = 'transparent'
        })
    }

    fadeOut(specify = '', speed = '') {
        this.texts.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('fadeOut')<0)
                    a[i].element.className = 'animated fadeOut ' + speed
        })
    }

    fadeIn(specify = '', speed = '', delay = 0, delayBetween = 0) {
        var hitIndex = 0
        this.texts.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('fadeIn')<0) {
                    setTimeout(function(){
                        a[i].element.className = 'animated fadeIn ' + speed
                    },delay+hitIndex*delayBetween)
                    hitIndex++
                }

        })
        return hitIndex
    }

    //UPDATE SPECIFIC
    update(storage) {
        //ADD CODE
    }
}