var storage = {};
var N = 5

function updateParkingData (features, currentParking, currentParkingHistory) {
  storage = {
    features: features,
    parkingLotsCount: features.length,
    parkingSpacesCount: features.reduce((t,c,i)=>t+c.properties.total_num_of_places,0),
    actualParkingName: currentParking.properties.name,
    actualAllParkingCapacity: currentParking.properties.total_num_of_places,
    actualParkingCapacity: currentParking.properties.num_of_free_places,
    actualParkingCapacityRatio: Math.round(currentParking.properties.num_of_taken_places/currentParking.properties.total_num_of_places*100),
    dayHourOccupancy: Object.keys(currentParking.properties.average_occupancy)
      .map(day=>{
        return Object.keys(currentParking.properties.average_occupancy[day])
          .sort((a,b)=>(parseInt(a) < parseInt(b)) ? 1 : -1)
          .map(hour=>{
            return currentParking.properties.average_occupancy[day][hour]/currentParking.properties.total_num_of_places*100
          })
      }),
    lastOccupancy: currentParkingHistory
      .map(ph => [ph.last_updated, ph.num_of_taken_places/ph.total_num_of_places*100])
      .filter((ph,i)=>(i%24==0))
  }
}
updateParkingData(
  mockdata.parkings.features,
  mockdata.parkings.features[N],
  mockdata.parkingsHistory
    .filter(ph=> ph.id == mockdata.parkings.features[N].properties.id)
)

function resetParkingData(n) {
  updateParkingData(
    mockdata.parkings.features,
    mockdata.parkings.features[n],
    mockdata.parkingsHistory
      .filter(ph=> ph.id == mockdata.parkings.features[n].properties.id)
  )
}

// console.log(storage);


var Storage = {}