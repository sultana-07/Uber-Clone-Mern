const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log(token);
    

    if(!token){
      
        return res.status(401).json({error : "token error"});
     
        
    }

    const isBlackListed = await userModel.findOne({token : token});

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