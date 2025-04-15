const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3,"furst name must be at least 3 character long"]
        },

        lastname : {
            type : String,
            minlength : [3,"last name must be at least 3 character long"]
        },
    },

    email : {
        type : String,
        required : true,
        unique : true,
        minlength : [5,"email must be at least 5 character long"]
    },

    password : {
        type : String,
        required : true,
        select : false
    },

    socketId : {
        type : String
    }
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWR_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10)
}

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel;