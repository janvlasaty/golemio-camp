var TransportMaps = new Maps('transport')

TransportMaps.add({
    id: 'transport-all',
    options: {
        position: {
            top: '0px',
            left: '1300px',
        },
        size: {
            height: '1100px',
            width: '2400px',
        },
        initialization: {
            center: [14.424, 50.082],
            zoom: 10.5,
            pitch: 0,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            map.addImage('pulsing-dot', assets.pulsingDot(map,255,255,255,2500), {
                pixelRatio: 2
            });

            map.addSource('transport-points',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "transport-points",
                "type": "circle",
                "source": "transport-points",
                "paint": {
                    "circle-color": "#F9A35A",
                    "circle-radius": 10,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "white",
                }
            })


            map.addSource('trip-point',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "trip-point",
                "type": "symbol",
                "source": "trip-point",
                "layout": {
                    "icon-image": "pulsing-dot"
                }
            });
        }
    },
    assets: {
        pulsingDot: function (map,r=255,g=33,b=0,duration=1000,size=600) { 
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


TransportMaps.add({
    id: 'transport-one',
    options: {
        position: {
            top: '1200px',
            left: '1300px',
        },
        size: {
            height: '1100px',
            width: '1800px',
        },
        initialization: {
            center: [14.39323,49.95835],
            zoom: 10,
            pitch: 0,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            map.addImage('pulsing-dot', assets.pulsingDot(map,255,255,255,2500), {
                pixelRatio: 2
            });
            map.addSource('shape-line',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "shape-line",
                "type": "line",
                "source": "shape-line",
                "paint": {
                    "line-color": "#F9A35A",
                    "line-width": [
                        "interpolate", ["linear"], ["zoom"],
                        10, 10,
                        15, 5,
                    ],
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
            })


            map.addSource('stop-points',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "stop-points",
                "type": "circle",
                "source": "stop-points",
                "paint": {
                    "circle-color": "#F9A35A",
                    "circle-radius": [
                        "interpolate", ["linear"], ["zoom"],
                        5, 15,
                        10, 10,
                    ],
                    "circle-stroke-width": [
                        "interpolate", ["linear"], ["zoom"],
                        5, 5,
                        10, 2,
                    ],
                    "circle-stroke-color": "black",
                }
            });


            map.addSource('trip-point',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "trip-point",
                "type": "symbol",
                "source": "trip-point",
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

TransportMaps.initMaps()