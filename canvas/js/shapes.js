var Shapes = {
    shapeElements: ['parking','airquality','waste','transport','sharing'].map(s=>{
        return { id: s, element: document.querySelector('#category-'+s)}
    }),
    highlighted: '',
    transitionDuration: 3000,
    transitionDelay: 1000,
    showAll: async function() {
        // return highlighted to home position
        this.shapeElements.filter(s=>s.id==this.highlighted).forEach(s=>{
            s.element.className = 'position-home'
        })
        // fadeIn step by step all other
        this.shapeElements.filter(s=>s.id!=this.highlighted).forEach((s,i,a)=>{
            s.element.className = 'position-home hidden'
            setTimeout(function(){
                    s.element.className = 'position-home animated fadeIn slower'
                },
                this.transitionDelay
                +i*(this.transitionDuration-this.transitionDelay)/a.length
            )
        })
        this.highlighted = ''
        return await new Promise(resolve => setTimeout(resolve, this.transitionDuration+this.transitionDuration));
    },
    hideAll: async function(except='') {
        var promises = []
        this.shapeElements.filter(s=>s.id!=except).forEach((s,i,a)=>{
            promises.push(new Promise(resolve=>{
                setTimeout(function(){
                        s.element.className = 'animated fadeOut slower'
                        resolve()
                    },
                    i*(this.transitionDuration-this.transitionDelay)/a.length
                )
            }))
            //promises.push(new Promise(resolve=>{
                setTimeout(function(){
                        s.element.className = 'hidden'
            //            resolve()
                    },
                    this.transitionDuration
                    +i*(this.transitionDuration-this.transitionDelay)/a.length
                )
            //}))
        })
        return await Promise.all(promises)
    },
    highlightOne: async function(shape) {
        if (this.highlighted!='') return 'error > first showAll()!'
        this.highlighted = shape
        await this.hideAll(shape)
        var promises = []

        this.shapeElements.filter(s=>s.id==shape).forEach(s=>{
            // promises.push(new Promise(resolve=>{
                setTimeout(function(){
                        s.element.className = 'position-highlighted'
                    },
                    this.transitionDelay
                )
            // }))
            promises.push(new Promise(resolve=>{
                setTimeout(function(){
                        resolve()
                    },
                    this.transitionDelay+this.transitionDuration
                )
            }))
        })
        return await Promise.all(promises)
    },
}