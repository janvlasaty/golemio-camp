class Statistics {
    constructor(container) {
        this.container = container
        this.wrapper = document.querySelector('#container-' + container + ' .statistics')
        this.frames = []
        this.statistics = []
    }

    addFrame(options) {
        this.frames.push(options)
    }
    addStatistic(options) {
        if (options.active)
            this.statistics.push(options)
    }

    renderFrames() {
        this.frames.forEach((f,i,a)=>{
            a[i].element = document.createElement('div')
            a[i].element.id = this.container+'-statistics-frame-'+f.id;
            a[i].element.style.position = 'absolute'
            a[i].element.style.left = f.position.x + 'px'
            a[i].element.style.top = f.position.y + 'px'

            this.wrapper.appendChild(a[i].element)
        })
    }

    renderStatistics() {
        this.statistics.forEach((s, i, a) => {
            a[i].element = document.createElement('div')
            a[i].element.id =  this.container+'-statistics-statistic-'+s.id;
            a[i].element.style['text-align'] = 'center'
            a[i].element.style.position = 'absolute'
            a[i].element.style.left = s.position.x + 'px'
            a[i].element.style.top = s.position.y + 'px'
            a[i].element.style.width = s.size.width + 'px'

            var statisticElement = document.createElement('div')
            switch (s.data.type) {
                case 'number': 
                    statisticElement.id = a[i].element.id+'-countup'
                    statisticElement.className = s.classList.concat(['statistics-number-big']).join(' ')
                    statisticElement.innerHTML = s.options.value
                    break;
                case 'text': 
                    statisticElement.className = s.classList.concat(['statistics-text-big']).join(' ')
                    statisticElement.innerHTML = s.options.text
                    break;
                default:
                    break;
            } 
            a[i].element.appendChild(statisticElement);

            var statisticTitle = document.createElement('h2')
            statisticTitle.style.position = 'absolute'
            statisticTitle.style.top = '80px'
            statisticTitle.style.width = '100%'
            statisticTitle.innerHTML = s.options.title
            a[i].element.appendChild(statisticTitle)

            this.frames.forEach((f,j,b)=>{
                if (f.id==s.frame) 
                    b[j].element.appendChild(a[i].element)
            })

            switch (s.data.type) {
                case 'number': 
                    a[i].countup = new CountUp(statisticElement.id, 10, { decimalPlaces: s.options.decimalPlaces });
                    a[i].countup.update(s.options.value)
                    break;
                case 'text': 
                    a[i].baffle = baffle(statisticElement,{
                        characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                        speed: 200
                    })
                    break;
                default:
                    break;
            } 

            a[i].element.className = 'transparent'

        
        })
    }

    render() {
        this.renderFrames()
        this.renderStatistics()
    }

    hide(specify = '') {
        this.statistics.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('transparent')<0)
                    a[i].element.className = 'transparent'
        })
    }

    fadeOut(specify = '', speed = '') {
        this.statistics.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('fadeOut')<0)
                    a[i].element.className = 'animated fadeOut ' + speed
        })
    }

    fadeIn(specify = '', speed = '') {
        this.statistics.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('fadeIn')<0)
                    a[i].element.className = 'animated fadeIn ' + speed
        })
    }

    //UPDATE SPECIFIC
    update(id,data) {
        this.statistics.filter(e=>e.id == id).forEach((e,i,a) => {
            switch (e.data.type) {
                case 'number':
                    a[i].countup.update(data)
                    break;
                case 'text':
                    a[i].baffle.start()
                    a[i].baffle.text(currentText=>data)
                    a[i].baffle.reveal(500)
                    break;
                default:
                    break;
            }
        })
    }
}