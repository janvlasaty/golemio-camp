var WasteMaps = new Maps('waste')

WasteMaps.add({
    id: 'waste',
    options: {
        position: {
            top: '900px',
            left: '800px',
        },
        size: {
            height: '1300px',
            width: '2450px',
        },
        initialization: {
            center: [14.424, 50.082],
            zoom: 12.5,
            pitch: 00,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            // console.log(assets)
            map.addImage('pulsing-dot', assets.pulsingDot(map,100,239,209,2500), {
                pixelRatio: 2
            });
            map.addSource('waste-points',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addSource('waste-point',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addSource('waste-sensored-points',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "waste-points",
                "type": "circle",
                "source": "waste-points",
                "paint": {
                    "circle-color": "rgba(100,239,209,1)",
                    "circle-radius": 3,
                    "circle-opacity": .75,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "white",
                    "circle-stroke-opacity": 1,
                },
                "transition": {
                    "duration": 3000,
                    "delay": 0
                }
            });
            map.addLayer({
                "id": "waste-sensored-points",
                "type": "circle",
                "source": "waste-sensored-points",
                "layout": {
                    "visibility": "none",
                },
                "paint": {
                    "circle-color": "rgba(100,239,209,1)",
                    "circle-radius": 15,
                    "circle-opacity": 0,
                    "circle-stroke-width": 3,
                    "circle-stroke-color": "white",
                    "circle-stroke-opacity": 0,
                },
                "transition": {
                    "duration": 3000,
                    "delay": 0
                }
            });
            map.addLayer({
                "id": "waste-point",
                "type": "symbol",
                "source": "waste-point",
                "layout": {
                    "icon-image": "pulsing-dot"
                }
            });
        }
    },
    assets: {
        pulsingDot: function (map,r=255,g=0,b=0,duration=1000,size=400) { 
            return {
                width: size,
                height: size,
                data: new Uint8Array(size * size * 4),
        
                onAdd: function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    this.context = canvas.getContext('2d');
                },
        
                render: function () {
                    var t = (performance.now() % duration) / duration;
        
                    var radius = size / 6;
                    var outerRadius = size / 3 * t + radius;
                    var context = this.context;
        
                    // draw outer circle
                    context.clearRect(0, 0, this.width, this.height);
                    context.beginPath();
                    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
                    context.fillStyle = 'rgba('+r+', '+g+', '+b+',' + (1 - t) + ')';
                    context.fill();
        
                    // draw inner circle
                    context.beginPath();
                    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
                    context.fillStyle = 'rgba('+r+', '+g+', '+b+', 1)';
                    context.strokeStyle = 'white';
                    context.lineWidth = 4 + 4 /** (1 - t)*/;
                    context.fill();
                    context.stroke();
        
                    // update this image's data with data from the canvas
                    this.data = context.getImageData(0, 0, this.width, this.height).data;
        
                    // keep the map repainting
                    map.triggerRepaint();
        
                    // return `true` to let the map know that the image was updated
                    return true;
                }
            }
        }
    },
})

WasteMaps.initMaps()