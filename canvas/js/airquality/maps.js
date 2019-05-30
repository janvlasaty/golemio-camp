var AirqualityMaps = new Maps('airquality')


AirqualityMaps.add({
    id: 'CHMI',
    options: {
        position: {
            top: '300px',
            left: '1400px',
        },
        size: {
            height: '900px',
            width: '2200px',
        },
        initialization: {
            center: [14.424, 50.05],
            zoom: 11,
            pitch: 0,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            map.addImage('pulsing-dot', assets.pulsingDot(map,255,33,0,2500), {
                pixelRatio: 2
            });
            map.addSource('source-airquality-points', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addSource('airquality-point', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "airquality-points",
                "type": "circle",
                "source": "source-airquality-points",
                "paint": {
                    "circle-color": "rgba(255,33,0,1)",
                    "circle-radius": 20,
                    "circle-stroke-width": 5,
                    "circle-stroke-color": "white",
                }
            });
            map.addLayer({
                "id": "airquality-point",
                "type": "symbol",
                "source": "airquality-point",
                "layout": {
                    "icon-image": "pulsing-dot"
                }
            });
        }
    },
    assets: {
        pulsingDot: function (map,r=255,g=33,b=0,duration=1000,size=400) { 
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

AirqualityMaps.add({
    id: 'Karlin',
    options: {
        position: {
            top: '300px',
            left: '4300px',
        },
        size: {
            height: '900px',
            width: '2500px',
        },
        initialization: {
            center: [14.424, 50.082],
            zoom: 18,
            pitch: 60,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            var layers = map.getStyle().layers;

            var labelLayerId;
            var roadsLayers = []
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].id.slice(0,5)=='road-') roadsLayers.push(layers[i].id)
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id;
                    break;
                }   
            }
            // console.log(roadsLayers)
            roadsLayers.forEach(l=>
                map.setPaintProperty(l, 'line-opacity', 0.5)
            )
            map.setPaintProperty('building', 'fill-color', 'black');


            map.addImage('pulsing-dot', assets.pulsingDot(map,255,33,0,2500), {
                pixelRatio: 2
            });

            map.addSource('karlin-points', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "karlin-points",
                "type": "circle",
                "source": "karlin-points",
                "paint": {
                    "circle-color": "rgba(255,33,0,1)",
                    "circle-radius": 20,
                    "circle-stroke-width": 5,
                    "circle-stroke-color": "white",
                }
            });
            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#fff',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        "interpolate", ["linear"],
                        ["zoom"],
                        15, 0,
                        15.05, ["get", "height"]
                    ],
                    'fill-extrusion-base': [
                        "interpolate", ["linear"],
                        ["zoom"],
                        15, 0,
                        15.05, ["get", "min_height"]
                    ],
                    'fill-extrusion-opacity': .6
                }
            }, labelLayerId);


            map.addSource('karlin-point', {
                type: 'geojson',
                data: turf.featureCollection([])
            })
            map.addLayer({
                "id": "karlin-point",
                "type": "symbol",
                "source": "karlin-point",
                "layout": {
                    "icon-image": "pulsing-dot"
                }
            });
        },
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

AirqualityMaps.initMaps()