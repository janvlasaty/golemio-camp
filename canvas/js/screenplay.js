var Screenplay = {
    playing: false,
    playingScenario: '',
    scenarios: {
        parking: {
            keyframes: [
                {
                    duration: 10,
                    action: function() {
                        ParkingStatistics.update('parkingLotsCount',storage.parkingLotsCount)
                        ParkingStatistics.fadeIn('parkingLotsCount','slower')
                        Message.update(
                            'In Prague there are '+storage.parkingLotsCount+' P+R parkings.', 
                            '3000px', 5000, 'slow')
                    }
                },
                {
                    duration: 4,
                    action: function() {
                        ParkingStatistics.update('parkingSpacesCount',storage.parkingSpacesCount)
                        ParkingStatistics.fadeIn('parkingSpacesCount','slower')
                        Message.update(
                            'Total number of parking spaces is '+storage.parkingSpacesCount+'.', 
                            '3000px', 5000, 'slow')
                    }
                },
                {
                    duration: 6,
                    action: function() {
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
                    action: function() {
                        var currentN = Math.round(Math.random()*(mockdata.parkings.features.length-1));
                        resetParkingData(currentN)
                        
                        ParkingCharts.update(storage)
                        ParkingCharts.fadeIn('','slower')
                        
                        ParkingStatistics.update('parkingCapacity',storage.actualParkingCapacity)
                        ParkingStatistics.update('parkingName',storage.actualParkingName)
                        ParkingStatistics.fadeIn('','slower')
                        
                        //MAP
                        ParkingMaps.get('parking').element.flyTo({
                            center: mockdata.parkings.features[currentN].geometry.coordinates,
                            zoom: 12.8,
                            pitch: 30,
                            speed: 0.05, // make the flying slow
                            curve: 1.1,
                        })
                        ParkingMaps.get('parking').element.getSource('parking-point').setData(turf.featureCollection([mockdata.parkings.features[currentN]]))
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
                    action: function() {
                        var currentN = Math.round(Math.random()*(mockdata.parkings.features.length-1));
                        resetParkingData(currentN)
                        
                        ParkingCharts.update(storage)
                        ParkingCharts.fadeIn('','slower')
                        
                        ParkingStatistics.update('parkingCapacity',storage.actualParkingCapacity)
                        ParkingStatistics.update('parkingName',storage.actualParkingName)
                        ParkingStatistics.fadeIn('','slower')
                        
                        //MAP
                        ParkingMaps.get('parking').element.flyTo({
                            center: mockdata.parkings.features[currentN].geometry.coordinates,
                            zoom: 12.8,
                            pitch: 30,
                            speed: 0.05, // make the flying slow
                            curve: 1.1,
                        })
                        ParkingMaps.get('parking').element.getSource('parking-point').setData(turf.featureCollection([mockdata.parkings.features[currentN]]))
                    
                        Message.update('This is parking called '+storage.actualParkingName)
                    }
                }
            ],
            end: function() {
                ParkingCharts.hide()
                ParkingStatistics.hide()
                ParkingMaps.hide()
            }
        },
        transport: {
            keyframes: [
                {
                    timestamp: 5, duration: 20,
                    action: function() {
                        Message.update('nazdar transportation')
                    }
                }
            ],
            end: function() {
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
                        AirqualityMaps.fadeIn('CHMI','slower')
                        Message.update('There are '+mockdata.airqualitystations.features.length+' meteostations around Prague','1500px',5000,'slow')
                    }
                },
                {
                    duration: 5,
                    action: function() {            
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

                        //MAP FLYTO
                        AirqualityMaps.get('CHMI').element.flyTo({
                            center: mockdata.getAirqualityStation('AVYNA').geometry.coordinates,
                            // zoom: 12.8,
                            // pitch: 30,
                            speed: 0.05, // make the flying slow
                            curve: 1,
                        })
                    }
                },
                {
                    duration: 10,
                    action: function() {
                        Message.update('We monitor each station every 1 hour','1500px',5000,'slow')
                    }
                },
                {
                    duration: 3,
                    action: function() {
                        Message.update('Let\'s have a look to another one...','1500px',5000,'slow')
                    }
                },
                {
                    duration: 5,
                    action: function() {
                        //UPDATE            
                        AirqualityStatistics.update('CHMIName',
                            mockdata.getAirqualityStation('ARIEA').properties.name
                        )

                        AirqualityCharts.update('CHMIAirqualityIndex',
                            mockdata.getAirqualityStation('ARIEA').properties.measurement.AQ_hourly_index*25
                        )
                        AirqualityCharts.update('CHMILine-NO2',
                            mockdata.getAirqualityStationSensorHistory('ARIEA','NO2')
                        )
                        AirqualityCharts.update('CHMILine-PM10',
                            mockdata.getAirqualityStationSensorHistory('ARIEA','PM10')
                        )
                        AirqualityCharts.update('CHMILine-O3',
                            mockdata.getAirqualityStationSensorHistory('ARIEA','O3')
                        )
                        //MAP FLYTO
                        AirqualityMaps.get('CHMI').element.flyTo({
                            center: mockdata.getAirqualityStation('ARIEA').geometry.coordinates,
                            // zoom: 12.8,
                            // pitch: 30,
                            speed: 0.05, // make the flying slow
                            curve: 1,
                        })
                    }
                },
                {
                    duration: 3,
                    action: function() {
                        AirqualityTexts.fadeIn('KarlinInfo')
                        Message.update('There is pilote project for lamps in Karlin square','4500px',5000,'slow')
                    }
                },
                {
                    duration: 20,
                    action: function() {
                        AirqualityMaps.fadeIn('Karlin','slower')
                        //MAP ROTATE
                        AirqualityMaps.get('Karlin').element.flyTo({
                            center: mockdata.getAirqualityStation('ARIEA').geometry.coordinates,
                            // zoom: 12.8,
                            // pitch: 30,
                            speed: 0.01, // make the flying slow
                            bearing: 40,
                            curve: 1,
                        })
                    }
                }
            ],
            end: function() {
                AirqualityMaps.hide()
                AirqualityCharts.hide()
                AirqualityStatistics.hide()
            }
        },
        waste: {
            keyframes: [
                {
                    timestamp: 5, duration: 20,
                    action: function() {
                        Message.update('nazdar waste')
                    }
                }
            ],
            end: function() {
            }
        },
        sharing: {
            keyframes: [
                {
                    duration: 0,
                    action: function() {
                        SharingMaps.get('sharedcars').element
                            .getSource('source-sharing-points')
                            .setData(
                                mockdata.sharedcars
                            )
                        SharingTexts.fadeIn('carsharingInfo','slower')
                    }
                },
                {
                    duration: 1,
                    action: function() {
                        Message.update('In Prague recently launched new carshing services','1200px',5000,'slow')
                    }
                },
                {
                    duration: 10,
                    action: function() {
                        SharingMaps.fadeIn('sharedcars','slower')
                    }
                },
                {
                    duration: 40,
                    action: function() {
                        // SharingTexts.fadeIn()
                        SharingStatistics.update('CarsCountAvailable',mockdata.sharedcars.features.length)
                        SharingStatistics.fadeIn('CarsCountAvailable','slower')

                        SharingCharts.update('vehicleTypes',
                            mockdata.getSharingCompanyVehicleTypeCounts(5).counts,
                            { 
                                xaxis: { categories: mockdata.getSharingCompanyVehicleTypeCounts(5).labels },
                                // yaxis: { 
                                //     tickAmount: 2,
                                //     min: 0,
                                //     max: 600,
                                //     // max: Math.ceil(mockdata.getSharingCompanyVehicleTypeCounts(5).counts[0]/100)*100,
                                // },
                            }
                        )
                        SharingCharts.fadeIn('vehicleTypes','slower',1000)

                        SharingCharts.update('providers',
                            mockdata.getSharingCompanyOfferCounts().counts,
                            { labels: mockdata.getSharingCompanyOfferCounts().labels }
                        )
                        SharingCharts.fadeIn('providers','slower',2000)

                    }
                },
            ],
            end: function() {
                SharingMaps.hide()
                SharingCharts.hide()
                SharingStatistics.hide()
                // SharingTexts.hide()
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
    getScenario: function(scenario) {
        return this.scenarios[scenario]
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

        await Shapes.highlightOne(scenario)
        await Containers.show(scenario)

        var currentTimestamp = 0
        var maxDuration = 0
        this.getKeyframes(scenario).forEach((k,i,a)=>{
            if (i>0) currentTimestamp += a[i-1].duration
            maxDuration += k.realDuration || k.duration

            setTimeout(function () {
                if (_this.playingScenario == scenario && _this.playing) {
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
        this.playing = false
        this.playingScenario = ''
        this.returnToHome()
        return true
    },
}