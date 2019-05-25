var Containers = {
    containers: Array.apply(null, document.querySelectorAll('.container')),
    highlighted: '',
    hide: async function() {
        if (this.highlighted!='') {
            var container = this.containers.filter(c=>c.id == 'container-'+this.highlighted)[0]
            this.highlighted = ''
            return new Promise(resolve => {
                container.className = 'container animated fadeOut slower'
                setTimeout(function(){
                    container.className = 'container hidden'
                    resolve()
                },3000)
            })
        } else return 'Container > nothing to hide'
    },
    show: async function(containerID) {
        if (this.highlighted=='') {
            this.highlighted = containerID
            var container = this.containers.filter(c=>c.id == 'container-'+containerID)[0]
            return new Promise(resolve => {
                container.className = 'container animated fadeIn slower'
                setTimeout(function(){
                    resolve()
                },3000)
            })
        } else return 'Container > cannot show another one'
    },
}