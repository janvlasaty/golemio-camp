// document.addEventListener("DOMContentLoaded", function(event) {
//     document.querySelectorAll('.container').forEach(c=>{
//         c.className = 'container hidden'
//     })
//     document.querySelector('#loader').className='animated fadeOut slower'
//     // Shapes.hideAll()
//     Shapes.highlightOne('sharing')

//     setTimeout(function(){
//         Screenplay.play('sharing')
//     }, 5000);
// });

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", function(event) {

    if (getParameterByName('fluidEffect')=='true') document.querySelector('body').className = 'view_4k';

    setTimeout(function(){
        document.querySelectorAll('.container').forEach(c=>{
            c.className = 'container hidden'
        })
        console.log('shloud by ready')
        // Screenplay.play('parking')

        document.querySelector('#loader').className='animated fadeOut slower'

        if (true) {
            setTimeout(function() {
                document.querySelector('#loader').className='hidden'

                Shapes.showAll()

            },5000)
            // setTimeout(function() {

            //     Audio.replay('citynoise')
            //     Audio.setGain('citynoise',.15)
            //     setInterval(function(){
            //         Audio.replay('citynoise')
            //         Audio.setGain('citynoise',.15)
            //     },3*60*1000)

            // },20000)
        }
    },10)
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

    const keyToAction = {
        80: () => Screenplay.play('parking'),
        84: () => Screenplay.play('transport'),
        87: () => Screenplay.play('waste'),
        83: () => Screenplay.play('sharing'),
        65: () => Screenplay.play('airquality'),
        // 71: () => Screenplay.play('general'),
        82: () => Screenplay.kindReload(),
        76: () => {
            Loop.active = !Loop.active
            Loop.play()
        }
    }

    if (keyToAction[event.keyCode]!==undefined)
        keyToAction[event.keyCode]();
  };

