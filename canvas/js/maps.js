//DEFAULT MAP

mapboxgl.accessToken =
    'pk.eyJ1IjoiamFudmxhc2F0eSIsImEiOiJjamRibTJ5aTUyNmw2MndxbzI1OWV1cnM0In0.Xb_130SZJN27DMVhOAnfSQ';


class Maps {
    constructor (container) {
        this.maps = []
        this.assets = {}
        this.container = container
    }

    hide(specify = '') {
        this.maps.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].wrapper.className.indexOf('transparent')<0)
                    a[i].wrapper.className = 'transparent'
        })
    }
    
    fadeIn(one='', speed = '') {
        this.maps.filter(m=>(one=='')?true:m.id==one).forEach(m=>{
            m.element.className = 'animated fadeIn ' + speed
        })
    }

    fadeOut(one='', speed = '') {
        this.maps.filter(m=>(one=='')?true:m.id==one).forEach(m=>{
            m.element.className = 'animated fadeIn ' + speed
        })
    }

    add(mapOptions) {
        mapOptions.options.initialization.container = this.container+'-map-'+mapOptions.id
        this.maps.push({
            id: mapOptions.id,
            options: mapOptions.options,
            assets: mapOptions.assets,
        })
    }

    get(id) {
        return this.maps.filter(m=>m.id==id)[0]
    }

    initMaps() {
        var mapsElement = document.querySelector('#container-' + this.container + ' .maps')
        this.maps.forEach((m,i,a)=>{
            a[i].wrapper = document.createElement('div')
            a[i].wrapper.className = 'map-wrapper'
            a[i].wrapper.id = this.container+'-wrapper-'+m.id
            a[i].element = document.createElement('div')
            a[i].element.className = 'map-element'
            a[i].element.id = this.container+'-map-'+m.id

            var shaders = ['top','bottom','left','right']
            shaders.forEach(side=>{
                var shader = document.createElement('div')
                shader.className = 'shader shader-'+side
                a[i].wrapper.appendChild(shader)
            })
            if(m.options.position) {
                a[i].wrapper.style.position = 'absolute'
                a[i].wrapper.style.top = m.options.position.top
                a[i].wrapper.style.left = m.options.position.left
            }
            if(m.options.size) {
                a[i].wrapper.style.width = m.options.size.width
                a[i].wrapper.style.height = m.options.size.height

                a[i].element.style.position = 'absolute'
                a[i].element.style.width = m.options.size.width
                a[i].element.style.height = m.options.size.height
            }

            a[i].wrapper.appendChild(a[i].element)
            mapsElement.appendChild(a[i].wrapper)
            a[i].element = new mapboxgl.Map(m.options.initialization)
            a[i].element.on('load', function () {
                m.options.onload(a[i].element,a[i].assets)
                a[i].wrapper.className += ' transparent'
            });
        })
    }


    fadeOut(specify = '', speed = '') {
        this.maps.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].wrapper.className.indexOf('fadeOut')<0)
                    a[i].wrapper.className = 'map-wrapper animated fadeOut ' + speed
        })
    }

    fadeIn(specify = '', speed = '') {
        this.maps.forEach((e,i,a) => {
            if (specify == '' ? true : e.id == specify)
                if (a[i].wrapper.className.indexOf('fadeIn')<0)
                    a[i].wrapper.className = 'map-wrapper animated fadeIn ' + speed
        })
    }

    setBearing(id,stopBearing=0,duration=3000,easingFn='easeInOutQuad') {
        this.maps.forEach((e,i,a) => {
            if (id == '' ? true : e.id == id) {
                var startBearing = (e.element.getBearing()%360+360)%360
                stopBearing = (stopBearing%360+360)%360
                var difference = Math.abs(stopBearing - startBearing)

                var throughZero = difference > 180
                var clockwise = startBearing < stopBearing
                if (throughZero) clockwise = !clockwise

                if (throughZero) difference = 360-difference
                
                Array(Math.round(duration/20)).fill().forEach((t,i,a)=>{
                    var progress = i/a.length
                    setTimeout(function(){
                        e.element.setBearing(
                            startBearing+
                            Defaults.easingFunctions[easingFn](progress)
                                *difference*((clockwise?1:-1))
                        )
                    },progress*duration)
                })
                setTimeout(function(){
                    e.element.setBearing(stopBearing)
                },duration)
            }
        })
    }
}