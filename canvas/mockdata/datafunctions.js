//FUNCTIONS
mockdata.getAirqualityStation = function (id) {
    return this.airqualitystations.features.filter(s => s.properties.id == id)[0]
}

mockdata.getAirqualityStationSensorHistory = function (id, sensor) {
    return this.airqualitystationsHistory.filter(s => s.id == id &&
        s.measurement.components.filter(c => c.type == sensor)[0] != undefined
    ).map(s => {
        var data = s.measurement.components.filter(c => c.type == sensor)[0]
        return {
            x: parseInt(s.updated_at),
            y: parseFloat(data.averaged_time.value),
        }
    })
}


mockdata.getIcegatewaysensor = function (id) {
    return this.icegatewaysensors.features.filter(s => s.properties.id == id)[0]
}

mockdata.getIcegatewaysensorHistory = function (id, sensor) {
    return this.icegatewaysensorsHistory.filter(s => 
        (s.id == id && s.sensor_type == sensor)
    ).map(s => {
        return {
            x: parseInt(s.created_at),
            y: parseFloat(s.avg),
        }
    })
}

mockdata.getSharingCompanyOfferCounts = function () {
    var counts = {}
    this.sharedcars.features.forEach(c => {
        if (!counts[c.properties.company.name]) counts[c.properties.company.name] = 0
        counts[c.properties.company.name]++
    })
    return {
        counts: Object.keys(counts).map(c => counts[c]),
        labels: Object.keys(counts)
    }
}

mockdata.getSharingCompanyVehicleTypeCounts = function (maxBars = 7) {
    var counts = {}
    this.sharedcars.features.forEach(c => {
        var key = c.properties.name.split(' ')[0]
        if (key == 'Fabia') key = 'Škoda'
        if (!counts[key]) counts[key] = 0
        counts[key]++
    })
    var sortedLabels = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
    var sortedCounts = sortedLabels.map(c => counts[c])
    return {
        counts: sortedCounts.slice(0, maxBars - 1).concat([sortedCounts.slice(maxBars - 1, maxBars).reduce((p, c, i, a) => p + c)]),
        labels: sortedLabels.slice(0, maxBars - 1).concat(['Other']),
    }
}

mockdata.getSharingCompanyFuelTypeCounts = function (maxBars = 5) {
    var counts = {}
    this.sharedcars.features.forEach(c => {
        var key = c.properties.fuel.description
        if (!counts[key]) counts[key] = 0
        counts[key]++
    })
    var sortedLabels = Object.keys(counts).sort((a, b) => counts[b] - counts[a])
    var sortedCounts = sortedLabels.map(c => counts[c])
    return {
        counts: sortedCounts.slice(0, maxBars - 1).concat([sortedCounts.slice(maxBars - 1, maxBars).reduce((p, c, i, a) => p + c)]),
        labels: sortedLabels.slice(0, maxBars - 1).concat(['other']),
    }
}


mockdata.getBikeSharingCompanyCounts = function (maxBars = 5) {
    var counts = {}
    this.sharedbikes.features.forEach(c => {
        var key = c.properties.company.name
        if (!counts[key]) counts[key] = 0
        counts[key]++
    })
    return {
        counts: Object.keys(counts).map(c => counts[c]),
        labels: Object.keys(counts)
    }
}



mockdata.getWastestations = function (id) {
    return this.wastestations.features.filter(s => s.properties.id == id)[0]
}

mockdata.getWastestationFulness = function (id) {
    var typeIndexes = {
        'Čiré sklo': 4,
        'Plast': 0,
        'Papír': 1,
        'Barevné sklo': 2,
        'Nápojové kartóny': 3,
        'Kovy': 5,
    }

    var values = Array(6).fill(0)
    this.wastestations.features.filter(s => s.properties.id == id)[0].properties.containers.forEach(c => {
        if (c.last_measurement)
            values[typeIndexes[c.trash_type.description]] = c.last_measurement.percent_calculated
    })
    return values
}

mockdata.getWastestationNearestPick = function (id) {
    var pick = {
        type: 'plastic',
        timestamp: Infinity,
        daysTo: Infinity,
    }
    var englishTypes = {
        'Čiré sklo': 'White glass',
        'Plast': 'White glass',
        'Papír': 'White glass',
        'Barevné sklo': 'Ohter glass',
        'Nápojové kartóny': 'Bev. cartons',
        'Kovy': 'Metal',
    }
    this.wastestations.features.filter(s => s.properties.id == id)[0].properties.containers.forEach(c => {
        if (c.last_measurement) {
            var cTimestamp = moment(c.last_measurement.prediction_utc).unix() * 1000
            var diff = cTimestamp - moment().unix() * 1000;
            if (cTimestamp < pick.timestamp && diff > 0) {
                pick.type = englishTypes[c.trash_type.description]
                pick.timestamp = cTimestamp
                pick.daysTo = (cTimestamp - moment().unix() * 1000) / (1000 * 60 * 60 * 24)
                pick.daysTo = pick.daysTo
            }
        }
    })
    return pick
}


mockdata.getWastestationsSensored = function (id) {
    return this.wastestations.features.filter(s => {
        return s.properties.containers
            .filter(c => c.last_measurement !== undefined).length > 0
    })
}


mockdata.getWastestationsContainers = function () {
    var containers = []
    this.wastestations.features.forEach(s => {
        containers = containers.concat(s.properties.containers)
    })
    return containers
}

mockdata.getWastestationsContainersSensored = function () {
    return this.getWastestationsContainers().filter(s => {
        return s.last_measurement !== undefined
    })
}

mockdata.getWastestationsPicksRatioUnder50 = function () {
    var countUnder50 = 0
    this.wastestationsPicks.forEach(p => {
        if (p.percent_before < 50) countUnder50++
    })
    return Math.round(countUnder50 / this.wastestationsPicks.length * 100)
}

mockdata.getWastestationsMeasurements = function (id, days = 7) {
    return this.wastestationsMeasurements
        .filter(s => s.container_id == id)
        .filter(s => moment(s.measured_at_utc) > moment().subtract(days, 'days'))
        .map(s => {
            return {
                x: moment(s.measured_at_utc).toISOString(),
                y: parseFloat(s.percent_calculated),
            }
        })
}

mockdata.getTransportPreparedTrip = function (index = 0) {
    var preparedTrips = this.vehiclepositions.features.filter(t => t.properties.gtfsData != undefined)
    return preparedTrips[index]
}

mockdata.getTransportTrip = function (id) {
    return this.vehiclepositions.features.filter(t => id == t.properties.trip.gtfs_trip_id)[0]
}

mockdata.getTransportPreparedTripStops = function (gtfsdata) {
    return gtfsdata.stop_times.map(t => {
        return turf.point(t.stop.geometry.coordinates, Object.assign({
            arrival_time: t.arrival_time
        }, t.stop.properties))
    })
}
mockdata.getTransportPreparedTripStopsLinestring = function (gtfsdata) {
    return turf.lineString(gtfsdata.stop_times.map(t => {
        return t.stop.geometry.coordinates
    }), {
        trip_id: gtfsdata.trip_id
    })
}

mockdata.getTransportPreparedTripShapeLinestring = function (gtfsdata) {
    return turf.lineString(gtfsdata.shapes
        .sort((a,b)=>a.properties.shape_pt_sequence - b.properties.shape_pt_sequence)
        .map(t => {
            return t.geometry.coordinates
        }), {})
}

mockdata.getAverageDelay = function () {
    var average = { value: 0, count: 0}
    mockdata.vehiclepositions.features.filter(v => Math.abs(v.properties.last_position.delay) < 1000).forEach(v => {
        average.value = (v.properties.last_position.delay + average.value * average.count) / (average.count + 1);
        average.count++;
    })
    return average.value
}

mockdata.updateData =  function(id,data) {
    this[id] = data
}

mockdata.getParking = function (id) {
    return this.parkings.features.filter(p=>p.properties.id == id)[0]
}
mockdata.getParkingName = function (id) {
    return this.getParking(id).properties.name
} 
mockdata.getParkingCapacity = function (id) {
    return this.getParking(id).properties.total_num_of_places
} 
mockdata.getParkingFreeCapacity = function (id) {
    return this.getParking(id).properties.num_of_free_places
} 
mockdata.getParkingRestCapacity = function (id) {
    return this.getParking(id).properties.num_of_taken_places
} 
mockdata.getParkingFreeCapacityRatio = function (id) {
    return this.getParkingRestCapacity(id)/this.getParkingCapacity(id)*100
} 
mockdata.getParkingSpacesCount = function () {
    return this.parkings.features.reduce((t,c,i)=>t+c.properties.total_num_of_places,0)
} 
mockdata.getParkingDayHourOccupancy = function(id) {
    var currentParking = this.getParking(id)
    return Object.keys(currentParking.properties.average_occupancy)
        .map(day=>{
            return Object.keys(currentParking.properties.average_occupancy[day])
            .sort((a,b)=>(parseInt(a) < parseInt(b)) ? 1 : -1)
            .map(hour=>{
                return currentParking.properties.average_occupancy[day][hour]/currentParking.properties.total_num_of_places*100
            })
        })
}
mockdata.getParkingLastOccupancy = function(id) {
    return this.parkingsHistory
        .filter(ph=> ph.id == id)
        .map(ph => [ph.updated_at, ph.num_of_taken_places/ph.total_num_of_places*100])
        .filter((ph,i)=>(i%24==0))
}