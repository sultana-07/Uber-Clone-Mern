const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const captainController = require("../controllers/captain.controller")


router.post("/register", [
    
    body('email').isEmail().withMessage("Please enter a valid email"),
    body('password').isLength({min : 6}).withMessage("Password must be at least 6 characters"),
    body('fullname.firstname').isLength({min : 3}).withMessage("First name must be at least 3 characters"),
    body('fullname.lastname').isLength({min : 3}).withMessage("Last name must be at least 3 characters"),
   
    body("vehicle.color").isLength({min : 3}).withMessage("Color must be at least 3 characters"),
   
    body("vehicle.plate").isLength({min : 3}).withMessage("Plate must be at least 3 characters"),
    body("vehicle.capacity").isLength({min : 1}).withMessage("Capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("invalid vehicle type"),
],
    captainController.registerCaptain
)

module.exports = router

// why body('fullname.firstname') and body('fullname.lastname') are not working?