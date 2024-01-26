const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    hashedPassword:{
        type:String,
        required: true
    },
    mobileNumber:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    role:{
        type:Number,
        default:2,
        enum:[1,2]
    },
    address:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Users',userSchema);