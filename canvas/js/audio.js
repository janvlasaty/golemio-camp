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
        path: 'audio/outfoxing.mp3',
    },
    {
        id: 'paulie',
        path: 'audio/paulie_short.mp3',
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
Audio.fadeOut = function(id,duration) {
    this.resumeCtx()
    var _this = this
    this.tracks.filter(e=>e.id==id).forEach(e => {
        var steps = Array(Math.round(duration/100)).fill().map((e,i,a)=>(1-1/a.length*(i+1)))
        steps.forEach((s,i)=>{
            setTimeout(function(){
                e.gainNode.gain.value = s
            },duration/steps.length*(i+1))
            setTimeout(function(){
                _this.stop(id)
            },duration)
        })
    });
}
Audio.setGain = function(id,gain) {
    this.tracks.filter(e=>e.id==id).forEach(e => {
        e.gainNode.gain.value = gain;
    })
}