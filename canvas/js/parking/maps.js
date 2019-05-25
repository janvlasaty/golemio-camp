var ParkingMaps = new Maps('parking')


ParkingMaps.add({
    id: 'parking',
    options: {
        position: {
            top: '0px',
            left: '2400px',
        },
        size: {
            height: '1200px',
            width: '3000px',
        },
        initialization: {
            center: [14.424, 50.082],
            zoom: 12.5,
            pitch: 30,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            // console.log(assets)
            map.addImage('pulsing-dot', assets.pulsingDot(map,100,180,255,2500), {
                pixelRatio: 2
            });
            map.addSource('parking-points',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": storage.features
                }
            })
            map.addSource('parking-point',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": [storage.features[4]]
                }
            })
            map.addLayer({
                "id": "parking-points",
                "type": "circle",
                "source": "parking-points",
                "paint": {
                    "circle-color": "rgba(100,180,255,1)",
                    "circle-radius": 20,
                    "circle-stroke-width": 5,
                    "circle-stroke-color": "white",
                }
            });
            map.addLayer({
                "id": "parking-point",
                "type": "symbol",
                "source": "parking-point",
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
        
                    var radius = size / 4 * 0.5;
                    var outerRadius = size / 4 * 2 * t + radius;
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

ParkingMaps.initMaps()