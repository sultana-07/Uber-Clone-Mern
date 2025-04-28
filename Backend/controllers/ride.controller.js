const rideService = require('../services/ride.service.js');
const { validationResult } = require('express-validator');


module.exports.createRide = async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      console.log(req.body);
      console.log(req.user._id);
      
      

      const { userId, pickup, destination, vehicleType } = req.body;

     try {
        const ride = await rideService.createRides({user : req.user._id, pickup, destination, vehicleType});

        

        console.log("created");
        
        return res.status(201).json(ride);
     } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
      }
        
     }
      
