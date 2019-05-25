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
            map.addSource('source-airquality-points', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": storage.features
                }
            })
            map.addSource('airquality-point', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": [storage.features[4]]
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
        }
    }
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

            map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

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
                    'fill-extrusion-opacity': .7
                }
            }, labelLayerId);
        },
    },
})

AirqualityMaps.initMaps()