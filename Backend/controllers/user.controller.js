const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model")
const userService = require("../services/user.service")
const {validationResult} = require("express-validator")



module.exports.registerUser = async (req,res,next) => {
        const error = validationResult(req);

        if(!error.isEmpty()){
            return res.status(400).json({error : error.array()});
        }

        const {fullname,email,password} = req.body;

        const hashpassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashpassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({token,user})
}

module.exports.loginUser = async (req,res,next) => {
    const error = validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }
    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({error : "email or password is incorrect"});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({error : "email or password is incorrect"});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token)
     
    res.status(200).json({token,user});
}

module.exports.getUserProfile = async (req,res,next) => {
       res.status(200).json({user : req.user});
}

module.exports.logoutUser = async (req,res,next) => {
   res.clearCookie('token')
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   await blacklistTokenModel.create({token});
    res.status(200).json({message : "logout successfully"});
}