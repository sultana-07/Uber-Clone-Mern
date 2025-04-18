const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(token);
    

    if(!token){
      
        return res.status(401).json({error : "token error"});
     
        
    }

    const isBlackListed = await blacklistModel.findOne({token : token});

    if(isBlackListed){
        return res.status(401).json({error : "unauthorized"});
    }

    try {
         const decoded =  jwt.verify(token, process.env.JWT_SECRET);
       
         
         const user = await userModel.findById(decoded._id);
   
       
         
         req.user = user;
         return next();

    } catch (error) {
        return res.status(401).json({error : "catch error"});
       
        
        
    }
}

module.exports.authCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        res.status(401).json({error : "unauthorized"})
    }

    const isBlackListed = await blacklistModel.findOne({token : token});
    if(isBlackListed){
        res.status(401).json({error : 'unauthorized'})
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const captain = await captainModel.findById(decoded._id);

        if(!captain){
            res.status(401).json({error : 'unauthorized'})
        }

        req.captain = captain;
        return next();
        } catch (error) {
        return res.status(401).json({error : "catch error"});
        
    }
}