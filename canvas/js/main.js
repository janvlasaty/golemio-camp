document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function(){
        document.querySelectorAll('.container').forEach(c=>{
            c.className = 'container hidden'
        })
        console.log('shloud by reday')
        // Screenplay.play('parking')

        document.querySelector('#loader').className='animated fadeOut slower'

        if (true) {
            setTimeout(function() {
                document.querySelector('#loader').className='hidden'


                Shapes.showAll()

            },5000)
            setTimeout(function() {

                Audio.replay('citynoise')
                Audio.setGain('citynoise',.15)
                setInterval(function(){
                    Audio.replay('citynoise')
                    Audio.setGain('citynoise',.15)
                },3*60*1000)

            },20000)
        }
    },3000)
})

var Loop = {
    active: false,
    scenarios: [
        //'general',
        'parking','airquality','waste','transport','sharing'
    ],
    index: 0,
}
Loop.stop = function() {
    this.active = false
    this.index = 0 
}
Loop.replay = function() {
    this.stop()
    this.active = true
    this.play()
}
Loop.play = function() {
    if (Loop.active) {
        Screenplay.play(this.scenarios[this.index])
        console.log(Screenplay.getScenarioDuration(this.scenarios[this.index]))
        setTimeout(function(){
            Loop.play()
        },Screenplay.getScenarioDuration(this.scenarios[this.index])*1000+20000)
        this.index++
        if (this.index==this.scenarios.length) this.index = 0
    } else { this.index = 0 }
}
Loop.replay = function() {
    this.stop()
    this.active = true
    this.play()
}

document.onkeyup = function (event) {
    if (event.which == 80 || event.keyCode == 80) {
         Screenplay.play('parking')
    }
    if (event.which == 84 || event.keyCode == 84) {
         Screenplay.play('transport')
    }
    if (event.which == 87 || event.keyCode == 87) {
         Screenplay.play('waste')
    }
    if (event.which == 83 || event.keyCode == 83) {
         Screenplay.play('sharing')
    }
    if (event.which == 67 || event.keyCode == 67) {
         Screenplay.play('airquality')
    }
    if (event.which == 71 || event.keyCode == 71) {
         Screenplay.play('general')
    }
    if (event.which == 82 || event.keyCode == 82) {
         Screenplay.kindReload()
    }
    if (event.which == 76 || event.keyCode == 76) {
        Loop.active = !Loop.active
        Loop.play()
    }
  };

