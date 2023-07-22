//import mongoose
const mongoose = require('mongoose');

//define schema for product collection to store data
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        rate: {
            type: String,
            required: true
        },
        count: {
            type: String,
            required: true
        }
    }
})


// model to store product details
const products = new mongoose.model('products', productSchema)

// export model 
module.exports = products
