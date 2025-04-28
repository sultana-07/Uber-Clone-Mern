const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service')
const crypto = require('crypto')

async function getFare(pickup,destination) {

    if(!pickup || !destination) {
        throw new Error('Invalid pickup or destination location')
    }
    const distanceTime = await mapService.getDistanceAndTime(pickup, destination);

    const basefare = {
        auto : 30,
        car : 50,
        motorcycle : 20,
    };

    const perKmRate = {
        auto : 10,
        car : 15,
        motorcycle : 8,
    };

    const perMinuteRate = {
        auto : 2,
        car : 3,
        motorcycle : 1.5,
    };

    const fare = {
        auto : basefare.auto + ((distanceTime.distance.value)/1000 * perKmRate.auto) + ((distanceTime.duration.value)/60 * perMinuteRate.auto),
        car : basefare.car + ((distanceTime.distance.value)/1000  * perKmRate.car) + ((distanceTime.duration.value)/60* perMinuteRate.car),
        motorcycle : basefare.motorcycle + ((distanceTime.distance.value)/1000 * perKmRate.motorcycle) + ((distanceTime.duration.value)/60 * perMinuteRate.motorcycle),
    }
    return fare;

}

module.exports.getFare = getFare;

function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10,num -1), Math.pow(10,num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRides = async ({
    user,
    pickup,
    destination,
    vehicleType,
    
  
}) =>  {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('Invalid ride details')
    }
    const fare = await getFare(pickup, destination);
   
    console.log(fare);
    
   
    
    const ride = rideModel.create({
        user  : user,
        pickup : pickup,
        destination : destination,
       
        otp: getOtp(6),
        fare: fare[vehicleType],
    });
    return ride;

}

