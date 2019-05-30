class Charts {
    constructor(container) {
        this.container = container
        this.wrapper = document.querySelector('#container-' + container + ' .charts')
        this.charts = []
    }

    addChart(chartOptions) {
        if (chartOptions.active)
            this.charts.push(chartOptions)
    }

    renderCharts() {
        this.charts.forEach((c, i, a) => {
            a[i].element = document.createElement('div')
            a[i].element.id = this.container+'-chart-'+c.id

            // IN CSS in future??
            a[i].element.style.position = 'absolute'
            a[i].element.style.left = c.position.x + 'px'
            a[i].element.style.top = c.position.y + 'px'
            a[i].element.style.width = c.size.width + 'px'
            if (a[i].element.style.height)
                a[i].element.style.height = c.size.height + 'px'
            //

            this.wrapper.appendChild(a[i].element)
            a[i].chart = new ApexCharts(a[i].element, c.options)
            a[i].chart.render()
            a[i].element.className = c.className
        })
    }

    hide(specify = '') {
        this.charts.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('transparent')<0)
                    a[i].element.className = 'transparent'
        })
    }

    fadeOut(specify = '', speed = '') {
        var hit = false
        this.charts.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].element.className.indexOf('fadeOut')<0 && a[i].element.className.indexOf('transparent')<0) {
                    a[i].element.className = 'animated fadeOut ' + speed
                    hit = true
                }
        })
        return hit
    }

    fadeIn(specify = '', speed = '', delay = 0, delayBetween = 0) {
        var hitIndex = 0
        this.charts.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify) {
                if (a[i].element.className.indexOf('fadeIn')<0) {
                    setTimeout(function(){
                            a[i].element.className = 'animated fadeIn ' + speed
                    },delay+delayBetween*hitIndex)
                    hitIndex++
                }
            }
        })
        return hitIndex
    }

    //UPDATE SPECIFIC
    update(id, data, options = undefined) {
        this.charts.filter(e=>e.id == id).forEach((e,i,a) => {
            switch (e.data.seriesType) {
                case 'number':
                    a[i].chart.updateSeries([data])
                    break;
                case 'serie':
                    a[i].chart.updateSeries(data)
                    break;
                case 'series-one':
                    a[i].chart.updateSeries([{
                        name: 'serie-one',
                        data: data
                    }])
                    break;
                case 'series-one-array':
                    a[i].chart.updateSeries([{
                        name: 'serie-one-array',
                        data: data
                    }])
                    break;
                default:
                    break;
            }
            if (options) a[i].chart.updateOptions(options)
        })
    }
}