const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const {validationResult} = require("express-validator")
const blacklistModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res,next) => {
     const error = validationResult(req);
     if(!error.isEmpty()){
         return res.status(400).json({error : error.array()});
     }
     const {fullname,email,password,vehicle} = req.body;

     const isCaptainAlreadyExist = await captainModel.findOne({email});

     if(isCaptainAlreadyExist){
         return res.status(400).json({error : "captain already exist"});
     }

     const hashPassword = await captainModel.hashPassword(password);

     const captain = await captainService.createCaptain({
         firstname : fullname.firstname,
         lastname : fullname.lastname,
         email,
         password : hashPassword,
         color : vehicle.color,
         plate : vehicle.plate,
         capacity : vehicle.capacity,
         vehicleType : vehicle.vehicleType,
     })

        const token = captain.generateAuthToken();
        res.status(201).json({token,captain})
}

module.exports.loginCaptain = async(req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()})
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain){
        return res.status(400).json({erroor  : "captain not found"})
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({error : "password is incorrect"})
    }

    const token = captain.generateAuthToken();
    res.cookie("token",token)
    res.status(200).json({token,captain})
}

module.exports.getCaptainProfile = async (req,res,next) => {
    return res.status(200).json({captain : req.captain})
   
}

module.exports.logoutCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistModel.create({token})

    res.clearCookie("token")
    return res.status(200).json({message : "logout successfully"})
}