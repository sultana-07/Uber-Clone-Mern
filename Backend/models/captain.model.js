const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3,"First name must be at least"],
        },

        lastname : {
            type : String,
            minlength : [3,"First name must be at least 3 characters"],
        }
    },

    email  :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        match : [/.+@.+\..+/,"Please enter a valid email"],
    },

    password : {
        type : String,
        required : true,
        select : false,
    },

    socketId : {
        type : String,
       
    },

    status : {
        type : String,
        enum : ["active","inactive"],
        default : "inactive",
    },

    vehicle : {
        color : {
            type : String,
            required : true,
            minlength : [3,"Color must be at least 3 characters"],
        },

        plate : {
            type : String,
            required : true,
           
            minlength : [3,"Plate must be at least 3 characters"],
        },

        capacity : {
            type : Number,
            required : true,
            min : [1,"Capacity must be at least 1"],
        },

        vehicleType : {
            type : String,
            required : true,
            enum : ["car","motorcycle","auto"],
        },
    },

    location : {
        ltd : {
            type : Number,
           
        },
        lng : {
            type : Number,
        }
    }

    // location : {
    //     type  : {
    //         type : String,
    //         enum : ['point'],
    //         required : true
    //     },
    //     coordinates : {
    //         type : [Number],
    //         required : true
    //     }
    // }
})

// captainSchema.index({location : "2dsphere"});

captainSchema.methods.generateAuthToken =  function () {
    const token = jwt.sign({_id : this._id},process.env.JWT_SECRET,{expiresIn : "24d"});
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model("captain",captainSchema);
module.exports = captainModel;