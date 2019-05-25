var TransportMaps = new Maps('transport')

TransportMaps.add({
    id: 'transport-all',
    options: {
        initialization: {
            center: [14.424, 50.082],
            zoom: 11,
            pitch: 10,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            map.addSource('parking-points',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": mockdata.vehiclepositions.features
                }
            })
            map.addLayer({
                "id": "parking-points",
                "type": "circle",
                "source": "parking-points",
                "paint": {
                    "circle-color": "#F9A35A",
                    "circle-radius": 10,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "white",
                }
            })
        }
    }
})


TransportMaps.add({
    id: 'transport-all',
    options: {
        initialization: {
            center: [14.39323,49.95835],
            zoom: 14,
            pitch: 10,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            map.addSource('shape-points',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": mockdata.trip.shapes
                }
            })
            map.addLayer({
                "id": "shape-layer",
                "type": "circle",
                "source": "shape-points",
                "paint": {
                    "circle-color": "#F9A35A",
                    "circle-radius": 5,
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "black",
                }
            });
            
            map.addSource('shape-line',{
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": mockdata.trip.shapes.map(s=>[
                                s.geometry.coordinates
                            ]),
                        },
                        "properties": {}
                    }]
                }
            })
            map.addLayer({
                "id": "shape-line-layer",
                "type": "line",
                "source": "shape-line",
                "paint": {
                    "line-color": "#F9A35A",
                    "line-width": 2,
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
            })
        }
    }
})

TransportMaps.initMaps()