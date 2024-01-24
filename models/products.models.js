const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type:String,
        required: true
    },
    quantity:{
        type:String,
        required: true
    },
    description:{
        type: String,
        trim: true
    }
})

module.exports = mongoose.model('Products',productSchema);