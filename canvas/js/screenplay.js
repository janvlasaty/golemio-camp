var Screenplay = {
    playing: false,
    playingScenario: '',
    scenarios: {
        general: {
            keyframes: [
                {
                    duration: 10,
                    action: function() {
                        document.querySelector('#logo-prague').className = 'animated fadeIn slower delay-4s'
                        document.querySelector('#logo-smartprague').className = 'animated fadeIn slower delay-3s'
                        document.querySelector('#logo-golemio').className = 'animated fadeIn slower'
                        document.querySelector('#logo-oict').className = 'animated fadeIn slower delay-2s'
                    },
                },
                {
                    duration: 30,
                    action: function() {
                        GeneralTexts.fadeIn('generalInfo')
                        document.querySelector('#schema-dpsimple').className = 'animated fadeIn slower delay-5s'
                    },
                },
            ],
            end: function() {
                GeneralTexts.hide()
                document.querySelector('#schema-dpsimple').className = 'animated fadeOut'
                document.querySelector('#logo-prague').className = 'animated fadeOut'
                document.querySelector('#logo-smartprague').className = 'animated fadeOut'
                document.querySelector('#logo-golemio').className = 'animated fadeOut'
                document.querySelector('#logo-oict').className = 'animated fadeOut'
            } 
        },
        parking: {
            keyframes: [
                {
                    duration: 5,
                    action: function() {
                        ParkingTexts.fadeIn('parkingInfo','slower')
                        ParkingStatistics.fadeIn('parkingLotsCount','slower',2000)
                        ParkingStatistics.update('parkingLotsCount',mockdata.parkings.features.length,2000)
                        ParkingStatistics.fadeIn('parkingSpacesCount','slower',3000)
                        ParkingStatistics.update('parkingSpacesCount',mockdata.getParkingSpacesCount(),3000)
                    }
                },
                {
                    duration: 5,
                    action: function() {
                        Message.update(
                            'There are '+mockdata.parkings.features.length+' parking lots, '+mockdata.getParkingSpacesCount()+' spaces in total.', 
                            '3000px', 5000, 'slower')
                    }
                },
                {
                    duration: 6,
                    action: function() {
                        ParkingMaps.get('parking').element
                            .flyTo({center:[14.424, 50.082]})
                            .getSource('parking-point').setData(turf.featureCollection([]))
                        ParkingMaps.fadeIn('','slower')
                    }
                },
                {
                    duration: 7,
                    action: function() {
                        Message.update(
                            'Parkings are located all over the city.', 
                            '3000px', 5000, 'slow')
                    }
                },
                {
                    duration: 3,
                    name: 'showParking',
                    action: function(parkingID = 534016) {
                        
                        ParkingCharts.update('parkingCapacityRatio',Math.round(mockdata.getParkingFreeCapacityRatio(parkingID)))
                        ParkingCharts.update('parkingOccupancyPast48h',mockdata.getParkingLastOccupancy(parkingID))
                        Object.keys(Defaults.dayNames).forEach(d=>{
                            ParkingCharts.update('parkingAverageOccupancyBar-' + d,mockdata.getParkingDayHourOccupancy(parkingID)[d])
                        })

                        ParkingCharts.fadeIn('','slower',1000,500)
                        ParkingTexts.fadeIn('additionalParkingInfo','slower')
                        ParkingTexts.fadeIn('AverageOccupancy','slower')

                        ParkingStatistics.update('parkingCapacity',mockdata.getParkingCapacity(parkingID))
                        ParkingStatistics.update('parkingName',mockdata.getParkingName(parkingID))
                        ParkingStatistics.fadeIn('','slower')
                        
                        //MAP
                        ParkingMaps.get('parking').element.flyTo({
                            center: mockdata.getParking(parkingID).geometry.coordinates,
                            zoom: 12.8,
                            pitch: 30,
                            speed: 0.05, // make the flying slow
                            curve: 1.1,
                        })
                        ParkingMaps.get('parking').element.getSource('parking-point').setData(turf.featureCollection([mockdata.getParking(parkingID)]))
                    }
                },
                {
                    duration: 15,
                    action: function() {
                        Message.update(
                            'We monitor each parking every 5 minutes.',
                            '3000px', 5000, 'slow')
                    }
                },
                {
                    duration: 20,
                    repeat: 'showParking',
                    data: 534002,
                },
                {
                    duration: 20,
                    repeat: 'showParking',
                    data: 534201,
                },
            ],
            end: function() {
                ParkingCharts.hide()
                ParkingStatistics.hide()
                ParkingMaps.hide()
                ParkingTexts.hide()
            }
        },
        transport: {
            keyframes: [
                {
                    duration: 15,
                    action: function() {

                        TransportTexts.fadeIn('transportInfo','slower')

                        TransportStatistics.update('vehicleCount',mockdata.vehiclepositions.features.length)
                        TransportStatistics.fadeIn('vehicleCount','slower')

                        TransportStatistics.update('averageDelay',mockdata.getAverageDelay()/60)
                        TransportStatistics.fadeIn('averageDelay','slower',1000)

                        TransportMaps.get('transport-all').element
                            .getSource('transport-points')
                            .setData(
                                mockdata.vehiclepositions
                            )
                        TransportMaps.fadeIn('transport-all','slower')

                        Message.update(
                            'We monitor each bus every 10-20 seconds.',
                            '4300px', 5000, 'slow')
                    }
                },
                {
                    duration: 5,
                    action: function() {
                        Message.update(
                            'Let\'s have a look close to one trip.',
                            '1300px', 5000, 'slow')
                    },
                },
                {
                    duration: 30,
                    name: 'showTrip',
                    action: function(tripIndex = 0) {

                        var trip = mockdata.getTransportPreparedTrip(tripIndex)
                        var lineString = mockdata.getTransportPreparedTripShapeLinestring(trip.properties.gtfsData)
                        // var stops = mockdata.getTransportPreparedTripStops(trip.properties.gtfsData) //array
                        var bboxLinestring = turf.bbox(lineString)
                        var bbox = [bboxLinestring.slice(0,2),bboxLinestring.slice(2,4)]
                        
                        TransportMaps.get('transport-one').element
                            .getSource('trip-point')
                            .setData(
                                turf.featureCollection([trip])
                            )

                        TransportMaps.get('transport-one').element
                            .getSource('shape-line')
                            .setData(
                                turf.featureCollection([lineString])
                            )
                        
                        // TransportMaps.get('transport-one').element
                        //     .getSource('stop-points')
                        //     .setData(
                        //         turf.featureCollection(stops)
                            // )
                        TransportMaps.get('transport-one').element
                            .fitBounds(bbox, {
                                padding: {top: 400, bottom:400, left: 400, right: 400},
                                duration: 10000,
                                minZoom: 12,
                              })
                        TransportMaps.fadeIn('transport-one','slower')


                        TransportStatistics.update('alias',trip.properties.trip.gtfs_route_short_name)
                        TransportStatistics.fadeIn('alias','slower')
                        TransportStatistics.update('delay',trip.properties.last_position.delay/60)
                        TransportStatistics.fadeIn('delay','slower')
                        // TransportStatistics.update('targetStation',trip.properties.trip.gtfs_route_short_name)
                        // TransportStatistics.fadeIn('delay','slower')
                    }
                },
                {
                    duration: 30,
                    repeat: 'showTrip',
                    data: 1,
                },
                {
                    duration: 30,
                    repeat: 'showTrip',
                    data: 2,
                },
            ],
            end: function() {
                TransportStatistics.hide()
                TransportMaps.hide()
                TransportTexts.hide()
            }
        },
        airquality: {
            keyframes: [
                {
                    duration: 3,
                    action: function() {
                        AirqualityTexts.fadeIn('CHMIInfo','slower')
                    }
                },
                {
                    duration: 8,
                    action: function() {

                        AirqualityMaps.get('CHMI').element
                            .getSource('source-airquality-points')
                            .setData(
                                turf.featureCollection(mockdata.airqualitystations.features)
                            )
                        
                        AirqualityMaps.fadeIn('CHMI','slower')
                        Message.update('There are '+mockdata.airqualitystations.features.length+' stations around Prague',
                            // '1500px', CAMP
                            '1600px',
                            5000,'slow')
                    }
                },
                {
                    duration: 5,
                    action: function() {            

                        // MAP FLYTO
                        AirqualityMaps.get('CHMI').element
                            .getSource('airquality-point')
                            .setData(
                                turf.featureCollection([mockdata.getAirqualityStation('AVYNA')])
                            )
                        AirqualityMaps.get('CHMI').element
                            .flyTo({
                                center: mockdata.getAirqualityStation('AVYNA').geometry.coordinates,
                                speed: 0.05, // make the flying slow
                                curve: 1,
                            })

                        //UPDATE            
                        AirqualityStatistics.update('CHMIName',
                            mockdata.getAirqualityStation('AVYNA').properties.name
                        )

                        AirqualityCharts.update('CHMIAirqualityIndex',
                            mockdata.getAirqualityStation('AVYNA').properties.measurement.AQ_hourly_index*25
                        )
                        AirqualityCharts.update('CHMILine-NO2',
                            mockdata.getAirqualityStationSensorHistory('AVYNA','NO2')
                        )
                        AirqualityCharts.update('CHMILine-PM10',
                            mockdata.getAirqualityStationSensorHistory('AVYNA','PM10')
                        )
                        AirqualityCharts.update('CHMILine-O3',
                            mockdata.getAirqualityStationSensorHistory('AVYNA','O3')
                        )

                        //FADE
                        AirqualityStatistics.fadeIn('CHMIName')

                        AirqualityCharts.fadeIn('CHMIAirqualityIndex','',300)
                        AirqualityCharts.fadeIn('CHMILine-NO2','',600)
                        AirqualityCharts.fadeIn('CHMILine-PM10','',900)
                        AirqualityCharts.fadeIn('CHMILine-O3','',1200)
                    }
                },
                {
                    duration: 10,
                    action: function() {
                        Message.update('We monitor each station every 1 hour',
                            // '1500px', CAMP
                            '1600px',
                            5000,'slow')
                    }
                },
                {
                    duration: 3,
                    action: function() {
                        Message.update('Let\'s have a look to another one...',
                            // '1500px', CAMP
                            '1600px',
                            5000,'slow')
                    }
                },
                {
                    duration: 1,
                    action: function() {
                        // MAP FLYTO
                        AirqualityMaps.get('CHMI').element
                            .getSource('airquality-point')
                            .setData(
                                turf.featureCollection([mockdata.getAirqualityStation('ARIEA')])
                            )
                        //MAP FLYTO
                        AirqualityMaps.get('CHMI').element
                            .flyTo({
                                center: mockdata.getAirqualityStation('ARIEA').geometry.coordinates,
                                speed: 0.05, // make the flying slow
                                curve: 1,
                            })
                    }
                },
                {
                    duration: 5,
                    name: 'shownextchmipoint',
                    action: function(selectedID = 'ARIEA') {
                        //UPDATE            
                        AirqualityStatistics.update('CHMIName',
                            mockdata.getAirqualityStation(selectedID).properties.name
                        )

                        AirqualityCharts.update('CHMIAirqualityIndex',
                            mockdata.getAirqualityStation(selectedID).properties.measurement.AQ_hourly_index*25
                        )
                        AirqualityCharts.update('CHMILine-NO2',
                            mockdata.getAirqualityStationSensorHistory(selectedID,'NO2')
                        )
                        AirqualityCharts.update('CHMILine-PM10',
                            mockdata.getAirqualityStationSensorHistory(selectedID,'PM10')
                        )
                        AirqualityCharts.update('CHMILine-O3',
                            mockdata.getAirqualityStationSensorHistory(selectedID,'O3')
                        )
                    }
                },
                {
                    duration: 3,
                    action: function() {
                        AirqualityTexts.fadeIn('KarlinInfo')
                        Message.update('There is also pilot project in Karlin square','4500px',5000,'slow')

                        AirqualityStatistics.update('KarlinCount',
                            mockdata.icegatewaysensors.features.length
                        )
                        AirqualityStatistics.fadeIn('KarlinCount','',1000)
                    }
                },
                {
                    duration: 10,
                    action: function() {
                        AirqualityMaps.get('Karlin').element
                            .getSource('karlin-points').setData(
                                mockdata.icegatewaysensors
                            )
                        AirqualityMaps.get('Karlin').element
                            .setCenter([14.4483,50.0918])
                        AirqualityMaps.get('Karlin').element
                            .setZoom(16.5)
                        AirqualityMaps.get('Karlin').element
                            .setBearing(30)

                        AirqualityMaps.get('Karlin').element
                            .getSource('karlin-point').setData(
                                turf.featureCollection([])
                            )
                        AirqualityMaps.fadeIn('Karlin','slower')
                        //MAP ROTATE
                        AirqualityMaps.get('Karlin').element
                            .easeTo({bearing: -90,duration: 70000,easing: function(t){return t*t}})
                    }
                },
                {
                    duration: 1,
                    name: 'shownextkarlinpoint',
                    action: function(selectedID = 'ICE-003-042-000-014') {
                        AirqualityMaps.get('Karlin').element
                            .getSource('karlin-point').setData(
                                turf.featureCollection(
                                    mockdata.icegatewaysensors.features.filter(f=>f.properties.id==selectedID)
                                )
                            )
                        AirqualityCharts.update('KarlinLine-weather.temperature',
                            mockdata.getIcegatewaysensorHistory(selectedID,'weather.temperature')
                        )
                        AirqualityCharts.update('KarlinLine-noise',
                            mockdata.getIcegatewaysensorHistory(selectedID,'noise')
                        )
                    }
                },
                {
                    duration: 10,
                    action: function() {
                        AirqualityCharts.fadeIn('KarlinLine-weather.temperature','',500)
                        AirqualityCharts.fadeIn('KarlinLine-noise','',1000)
                    }
                },
                {
                    duration: 10,
                    repeat: 'shownextchmipoint',
                    data: 'AKOBA',
                },
                {
                    duration: 10,
                    repeat: 'shownextkarlinpoint',
                    data: 'ICE-003-042-000-017',
                },
                {
                    duration: 10,
                    repeat: 'shownextchmipoint',
                    data: 'ALIBA',
                },
                {
                    duration: 10,
                    repeat: 'shownextkarlinpoint',
                    data: 'ICE-003-042-000-030',
                },
            ],
            end: function() {
                AirqualityMaps.hide()
                AirqualityCharts.hide()
                AirqualityStatistics.hide()
                AirqualityTexts.hide()
            }
        },
        waste: {
            keyframes: [
                {
                    duration: 5,
                    action: function() {
                        //INIT
                        WasteMaps.get('waste').element
                            .getSource('waste-points').setData(
                                mockdata.wastestations
                            )
                        WasteMaps.get('waste').element
                            .getSource('waste-sensored-points').setData(
                                turf.featureCollection(mockdata.getWastestationsSensored())
                            )
                        WasteMaps.get('waste').element
                            .setBearing(30)

                        //FADE IN
                        WasteTexts.fadeIn('wasteInfo','slower')
                    },
                },
                {
                    duration: 12,
                    action: function() {
                        Message.update('There are '+mockdata.wastestations.features.length+' stations to collect sorted waste','1300px',5000,'slower')

                        WasteStatistics.update('stationsCount',mockdata.wastestations.features.length,0)
                        WasteStatistics.fadeIn('stationsCount','slower',0)
                        WasteStatistics.update('containersCount',mockdata.getWastestationsContainers().length,1000)
                        WasteStatistics.fadeIn('containersCount','slower',1000)


                        WasteMaps.get('waste').element
                            .easeTo({bearing: 0, duration: 35000})
                        WasteMaps.fadeIn('waste','slower')
                        
                    }
                },
                {
                    duration: 12,
                    action: function() {

                        Message.update('We put '+mockdata.getWastestationsContainersSensored().length+' sensors into containers to measure fullness...','1300px',5000,'slower')

                        WasteStatistics.update('stationsSensoredCount',mockdata.getWastestationsSensored().length,500)
                        WasteStatistics.fadeIn('stationsSensoredCount','slower',500)
                        WasteStatistics.update('containersSensoredCount',mockdata.getWastestationsContainersSensored().length,1500)
                        WasteStatistics.fadeIn('containersSensoredCount','slower',1500)


                        WasteMaps.get('waste').element
                            .setLayoutProperty('waste-sensored-points','visibility','visible')
                        WasteMaps.get('waste').element
                            .setPaintProperty('waste-points','circle-opacity',0)
                        WasteMaps.get('waste').element
                            .setPaintProperty('waste-points','circle-stroke-opacity',0)
                        WasteMaps.get('waste').element
                            .setPaintProperty('waste-sensored-points','circle-opacity',1)
                        WasteMaps.get('waste').element
                            .setPaintProperty('waste-sensored-points','circle-stroke-opacity',1)

                        setTimeout(function(){
                            WasteMaps.get('waste').element
                                .setLayoutProperty('waste-points','visibility','none')
                        },3000)

                    },
                },
                {
                    duration: 10,
                    action: function() {
                        Message.update('In fact '+mockdata.getWastestationsPicksRatioUnder50()+'% of picks are done with less then half empty containers!','1300px',5000,'slower')

                        WasteCharts.update('picksRatioUnder50',[mockdata.getWastestationsPicksRatioUnder50()],2000)
                        WasteCharts.fadeIn('picksRatioUnder50','slower',2000)
                        WasteTexts.fadeIn('picksUnder50Title','slower',2000)
                    },
                },
                {
                    duration: 15,
                    name: 'showStation',
                    action: function(station = '') {
                        // console.log(station)
                        if (station == '') 
                            station = mockdata.getWastestationsSensored()[Math.round(Math.random()*(mockdata.getWastestationsSensored().length-1))].properties.id
                        //FLY TO
                        WasteMaps.get('waste').element
                            .flyTo({center: mockdata.getWastestations(station).geometry.coordinates, bearing: 0, zoom: 13, speed: 0.05, curve: 1})
                        

                        var thisStation = mockdata.getWastestations(station)
                        WasteMaps.get('waste').element
                            .getSource('waste-point')
                            .setData( turf.featureCollection([thisStation]))

                        var englishNames = {
                            'plastic': 'Plast',
                            'paper': 'Papír',
                            'beveragecartons': 'Nápojové kartóny',
                            'whiteglass': 'Čiré sklo',
                            'otherglass': 'Barevné sklo',
                            'metal': 'Kovy',
                        }
                        Object.keys(englishNames).forEach(e=>{
                            var container = thisStation.properties.containers.filter(c=>c.trash_type.description == englishNames[e])[0]
                            if (container) {
                                if (container.last_measurement) {
                                    WasteCharts.update('waste-'+e,
                                        mockdata.getWastestationsMeasurements(
                                            container.sensor_id
                                        )
                                    )
                                    WasteCharts.fadeIn('waste-'+e,'slower')
                                } else {
                                    WasteCharts.fadeOut('waste-'+e,'slower')
                                }
                            } else {
                                WasteCharts.fadeOut('waste-'+e,'slower')
                            }
                        })

                        WasteCharts.update('actualFullness',
                            mockdata.getWastestationFulness(station)
                        )
                        WasteCharts.fadeIn('actualFullness')
                        
                        if (mockdata.getWastestationNearestPick(station).daysTo>0 && mockdata.getWastestationNearestPick(station).daysTo<100) {
                            WasteStatistics.update('daysToPick', mockdata.getWastestationNearestPick(station).daysTo)
                            WasteStatistics.fadeIn('daysToPick','slower')
                            WasteStatistics.update('typeToPick', mockdata.getWastestationNearestPick(station).type)
                            WasteStatistics.fadeIn('typeToPick','slower')
                        } else {
                            WasteStatistics.fadeOut('typeToPick','slower')
                            WasteStatistics.fadeOut('daysToPick','slower')
                        }
                        WasteStatistics.update('stationAddress',
                            mockdata.getWastestations(station).properties.name
                        )
                        WasteStatistics.fadeIn('stationAddress')

                    }
                },
                {
                    duration: 15,
                    repeat: 'showStation',
                    data: '',
                },
                {
                    duration: 15,
                    repeat: 'showStation',
                    data: '',
                },
            ],
            end: function() {
                WasteMaps.get('waste').element
                    .getSource('waste-point')
                    .setData( turf.featureCollection([]))

                WasteMaps.get('waste').element
                    .setCenter([14.424, 50.082])
                WasteMaps.get('waste').element
                    .setZoom(12.5)
                WasteMaps.get('waste').element
                    .setLayoutProperty('waste-points','visibility','visible')
                WasteMaps.get('waste').element
                    .setPaintProperty('waste-points','circle-opacity',1)
                WasteMaps.get('waste').element
                    .setPaintProperty('waste-points','circle-stroke-opacity',1)
                WasteMaps.get('waste').element
                    .setLayoutProperty('waste-sensored-points','visibility','none')
                WasteMaps.get('waste').element
                    .setPaintProperty('waste-sensored-points','circle-opacity',0)
                WasteMaps.get('waste').element
                    .setPaintProperty('waste-sensored-points','circle-stroke-opacity',0)

                var englishNames = {
                    'plastic': 'Plast',
                    'paper': 'Papír',
                    'beveragecartons': 'Nápojové kartóny',
                    'whiteglass': 'Čiré sklo',
                    'otherglass': 'Barevné sklo',
                    'metal': 'Kovy',
                }
                Object.keys(englishNames).forEach(e=>{
                    WasteCharts.fadeOut('waste-'+e)
                })
                WasteStatistics.update('stationsCount',0,0)
                WasteStatistics.update('containersCount',0,0)
                WasteStatistics.update('stationsSensoredCount',0,0)
                WasteStatistics.update('containersSensoredCount',0,0)

                WasteCharts.hide()
                WasteStatistics.hide()
                WasteMaps.hide()
                WasteTexts.hide()
            }
        },
        sharing: {
            keyframes: [
                {
                    duration: 10,
                    action: function() {
                        //TEST
                        // SharingCharts.update('bikeProviders',
                        //     mockdata.getBikeSharingCompanyCounts().counts,
                        //     { labels: mockdata.getBikeSharingCompanyCounts().labels }
                        // )
                        // SharingCharts.fadeIn('bikeProviders','',0)

                        //INIT


                        SharingCharts.update('BikeCountAvailable',0)
                        SharingCharts.update('CarsCountAvailable',0)


                        //UDPATE
                        SharingMaps.get('sharedcars').element
                            .getSource('source-sharing-points')
                            .setData(
                                mockdata.sharedcars
                            )

                        //MAP ROTATE
                        SharingMaps.get('sharedcars').element
                            .setCenter([14.424, 50.07])
                        SharingMaps.get('sharedcars').element
                            .setBearing(45)
                        SharingMaps.get('sharedcars').element
                            .easeTo({bearing: -45,duration: 100000,easing: function(t){return t}})

                        SharingTexts.fadeIn('carsharingInfo','slower')
                    }
                },
                {
                    duration: 1,
                    action: function() {
                        Message.update('In Prague there recently launched new carsharing services','1200px',5000,'slow')
                    }
                },
                {
                    duration: 10,
                    action: function() {
                        SharingMaps.fadeIn('sharedcars','slower')
                    }
                },
                {
                    duration: 20,
                    action: function() {
                        // SharingTexts.fadeIn()
                        SharingStatistics.update('CarsCountAvailable',mockdata.sharedcars.features.length)
                        SharingStatistics.fadeIn('CarsCountAvailable','slower')

                        SharingCharts.update('vehicleTypes',
                            mockdata.getSharingCompanyVehicleTypeCounts(5).counts,
                            { 
                                xaxis: { categories: mockdata.getSharingCompanyVehicleTypeCounts(5).labels },
                            }
                        )
                        SharingCharts.fadeIn('vehicleTypes','slower',1000)

                        SharingCharts.update('providers',
                            mockdata.getSharingCompanyOfferCounts().counts,
                            { labels: mockdata.getSharingCompanyOfferCounts().labels }
                        )
                        SharingCharts.fadeIn('providers','slower',2000)

                        SharingCharts.update('fuelTypes',
                            mockdata.getSharingCompanyFuelTypeCounts(5).counts,
                            { xaxis: { categories: mockdata.getSharingCompanyFuelTypeCounts(5).labels } }
                        )
                        SharingCharts.fadeIn('fuelTypes','slower',3000)

                    }
                },
                {
                    duration: 10,
                    action: function() {
                        //MAP ROTATE
                        SharingMaps.get('sharedbikes').element
                            .setCenter([14.424, 50.07])
                        SharingMaps.get('sharedbikes').element
                            .setBearing(45)
                        SharingMaps.get('sharedbikes').element
                            .easeTo({bearing: -45,duration: 70000,easing: function(t){return t}})

                        SharingMaps.get('sharedbikes').element
                            .getSource('source-sharing-points')
                            .setData(
                                mockdata.sharedbikes
                            )
                        SharingMaps.fadeIn('sharedbikes','slower')
                        SharingTexts.fadeIn('bikesharingInfo','slower')
                    }
                },
                {
                    duration: 10,
                    action: function() {
                        Message.update('There are '+mockdata.getBikeSharingCompanyCounts().counts.length+' bikesharing services','4800px',5000,'slow')
                        SharingCharts.update('bikeProviders',
                            mockdata.getBikeSharingCompanyCounts().counts,
                            { labels: mockdata.getBikeSharingCompanyCounts().labels }
                        )
                        SharingStatistics.update('BikeCountAvailable',mockdata.sharedbikes.features.length)
                        //FADE IN
                        SharingCharts.fadeIn('bikeProviders','slow',1000)
                        SharingStatistics.fadeIn('BikeCountAvailable','slow',2000)
                    }
                },
            ],
            end: function() {
                SharingMaps.hide()
                SharingCharts.hide()
                SharingStatistics.hide()
                SharingTexts.hide()
            }
        },
    },
    returnToHome: async function() {
        await Containers.hide()
        return await Shapes.showAll()
    },
    getKeyframe: function(scenario,i) {
        return this.scenarios[scenario].keyframes[i]
    },
    getKeyframeByName: function(scenario,name) {
        return this.scenarios[scenario].keyframes.filter(k => k.name == name)[0]
    },
    getScenario: function(scenario) {
        return this.scenarios[scenario]
    },
    getScenarioDuration: function(scenario) {
        var duration = 0
        this.getKeyframes(scenario).forEach(k=>{
            duration += k.duration
        })
        return duration
    },
    getKeyframes: function(scenario) {
        return this.scenarios[scenario].keyframes
    },
    getLastKeyframe: function(scenario) {
        return this.scenarios[scenario].keyframes[this.scenarios[scenario].keyframes.length-1]
    },
    play: async function(scenario) {
        var _this = this
        if (this.playing) return 'error > now playing'
        if (this.scenarios[scenario] == undefined) return 'error > wrong scenario'

        this.playing = true
        this.playingScenario = scenario

        Audio.fadeOut('intro')
        Audio.replay(scenario)

        await Shapes.highlightOne(scenario)
        await Containers.show(scenario)

        var currentTimestamp = 0
        var maxDuration = 0
        this.getKeyframes(scenario).forEach((k,i,a)=>{
            if (i>0) currentTimestamp += a[i-1].duration
            maxDuration += k.realDuration || k.duration

            setTimeout(function () {
                if (_this.playingScenario == scenario && _this.playing) {
                    if (k.repeat!=undefined)
                        _this.getKeyframeByName(scenario,k.repeat).action(k.data)
                    else 
                        _this.getKeyframe(scenario,i).action()
                }
            },currentTimestamp*1000)
        })

        setTimeout(function () {
            if (_this.playingScenario === scenario && _this.playing) {
                _this.stop()
                setTimeout(function () {
                    _this.getScenario(scenario).end()
                },5000)
            }
        }, (maxDuration)*1000)
        return true
    },
    stop: function() {

        Audio.fadeOut(this.playingScenario)
        this.playing = false
        this.playingScenario = ''

        this.returnToHome()
        return true
    },
    kindReload: function() {
        Audio.fadeOut('')
        document.querySelector('#loader p').className='transparent'
        document.querySelector('#loader').className='animated fadeIn slower'

        setTimeout(function(){
            location.reload(true)
        },5000)
        
        return true
    },
}