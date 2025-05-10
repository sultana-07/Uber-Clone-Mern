const axios = require('axios');
const captainModel =  require('../models/captain.model')

module.exports.getAddressCoordinate = async(address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };

        } else {
            throw new Error('Unable to get coordinates for the address provided.');
        }


    } catch (error) {
        console.log(`Error fetching coordinates: ${error.message}`);
        
    }
}

module.exports.getDistanceAndTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required.');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if( response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No route found for the provided locations.');
            }

            return response.data.rows[0].elements[0];
         
        } else {
            throw new Error('Unable to get distance and time for the provided locations.');
        }
    
    } catch (error) {
        console.log(`Error fetching distance and time: ${error.message}`);
        throw error;

        
    }
}

module.exports.getAddressSuggestions = async (input) => {
    if(!input) {
        throw new Error('query is required.');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('Unable to get address suggestions.');
        }
    } catch (error) {
        console.log(`Error fetching address suggestions: ${error.message}`);
        throw error;
        
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}