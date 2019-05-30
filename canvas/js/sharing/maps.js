var SharingMaps = new Maps('sharing')


SharingMaps.add({
    id: 'sharedcars',
    options: {
        position: {
            top: '0px',
            left: '1300px',
        },
        size: {
            height: '1200px',
            width: '1800px',
        },
        initialization: {
            center: [14.424, 50.05],
            zoom: 13,
            pitch: 60,
            bearing: 60,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            map.addSource('source-sharing-points', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "sharing-points",
                "type": "circle",
                "source": "source-sharing-points",
                "paint": {
                    "circle-color": "rgb(213, 61, 240)",
                    "circle-radius": 10,
                    "circle-stroke-width": 3,
                    "circle-stroke-color": "white",
                }
            });
        }
    }
})


SharingMaps.add({
    id: 'sharedbikes',
    options: {
        position: {
            top: '0px',
            left: '4600px',
        },
        size: {
            height: '1200px',
            width: '1800px',
        },
        initialization: {
            center: [14.424, 50.05],
            zoom: 13,
            pitch: 60,
            bearing:60,
            style: 'mapbox://styles/janvlasaty/cjutqb4e519hv1fo1ipiwbwmm',
        },
        onload: function(map,assets) {
            map.addSource('source-sharing-points', {
                type: 'geojson',
                data: {
                    "type": "FeatureCollection",
                    "features": []
                }
            })
            map.addLayer({
                "id": "sharing-points",
                "type": "circle",
                "source": "source-sharing-points",
                "paint": {
                    "circle-color": "rgb(213, 61, 240)",
                    "circle-radius": 10,
                    "circle-stroke-width": 3,
                    "circle-stroke-color": "white",
                }
            });
        }
    }
})


SharingMaps.initMaps()