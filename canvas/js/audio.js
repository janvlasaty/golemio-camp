// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load some sound
var Audio = {
    playing: false,
    tracks: [],
}

var audios = [
    {
        id: 'default',
        path: './audio/outfoxing.mp3',
    },
    {
        id: 'paulie',
        path: './audio/paulie_short.mp3',
    },
    {
        id: 'intro',
        path: './audio/intro.mp3',
    },
    {
        id: 'airquality',
        path: './audio/airquality.mp3',
    },
    {
        id: 'sharing',
        path: './audio/sharing.mp3',
    },
    {
        id: 'parking',
        path: './audio/parking.mp3',
    },
    {
        id: 'transport',
        path: './audio/transport.mp3',
    },
    {
        id: 'waste',
        path: './audio/waste.mp3',
    },
    {
        id: 'citynoise',
        path: './audio/citynoise.mp3',
    }
]
audios.forEach((e,i)=>{
    Audio.tracks.push({
        id: e.id,
        element: {},
        source: {},
        playing: false,
    })
    Audio.tracks[i].element = document.createElement('audio')
    Audio.tracks[i].element.id = e.id
    Audio.tracks[i].element.src = e.path     
    Audio.tracks[i].element.type = 'audio/mpeg'
    Audio.tracks[i].element.crossorigin = "anonymous"
    document.querySelector('#audios').appendChild(Audio.tracks[i].element)
    Audio.tracks[i].source = audioCtx.createMediaElementSource(Audio.tracks[i].element)
    Audio.tracks[i].gainNode = audioCtx.createGain();
    Audio.tracks[i].gainNode.gain.value = 1;

    Audio.tracks[i].element.addEventListener('ended', (e) => {
        console.log('Audio ('+e.target.id+') ended.')
    }, false);

    Audio.tracks[i].source.connect(Audio.tracks[i].gainNode).connect(audioCtx.destination);
})

Audio.resumeCtx = function() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume()
    }
}
Audio.suspendCtx = function() {
    if (audioCtx.state !== 'suspended') {
        audioCtx.suspend()
    }
}
Audio.play = function(id) {
    this.resumeCtx()
    this.tracks.filter(e=>e.id==id).forEach(e => {
        if (!e.playing) {
            e.gainNode.gain.value = 1
            e.element.play()
            e.playing = true;
        }
    });
}
Audio.pause = function(id) {
    this.resumeCtx()
    this.tracks.filter(e=>e.id==id).forEach(e => {
        if (e.playing) {
            e.element.pause()
            e.playing = false;
        }
    });
}
Audio.stop = function(id) {
    this.resumeCtx()
    this.tracks.filter(e=>e.id==id).forEach(e => {
        if (e.playing) {
            e.element.pause()
            e.element.currentTime = 0
            e.playing = false;
        }
    });
}
Audio.replay = function(id) {
    this.resumeCtx()
    this.stop(id)
    this.play(id)
}
Audio.fadeOut = function(id='',duration=2000) {
    this.resumeCtx()
    var _this = this
    this.tracks.filter(e=>e.id==id || id == '').forEach(e => {
        if (e.playing) {
            var arraySteps = Array(Math.round(duration/100)).fill()
            var steps = arraySteps.map((s,i,a)=>(e.gainNode.gain.value*(1-1/a.length*(i))))
            steps.forEach((s,i)=>{
                setTimeout(function(){
                    e.gainNode.gain.value = s
                },duration/steps.length*(i))
            })
            setTimeout(function(){
                _this.stop(id)
            },duration)
        }
    });
}
Audio.setGain = function(id,gain) {
    this.tracks.filter(e=>e.id==id).forEach(e => {
        e.gainNode.gain.value = gain;
    })
}