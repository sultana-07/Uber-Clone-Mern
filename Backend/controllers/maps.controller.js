const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getAddressCoordinate = async (req, res,next) => {

    // Validate the request parameters

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports.getDistanceAndTime = async (req, res,next) => {
   
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;
        const distanceAndTime = await mapService.getDistanceAndTime(origin, destination);

        res.status(200).json(distanceAndTime);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
        
    }
}

module.exports.getAddressSuggestions = async (req, res,next) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        const suggestions = await mapService.getAddressSuggestions(input);

        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
        
    }
}