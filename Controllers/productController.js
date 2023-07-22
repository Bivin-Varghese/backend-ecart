//logic to resolve 


// import product collections
const products = require('../model/productSchema')

//import wishlist collection
// const wishlists = require('../model/wishlistSchema')


//get all products
exports.getallproducts = async (req, res) => {
    //logic
    try {
        // get all products from products collection in mngodb
        const allProducts = await products.find()
        res.status(200).json(allProducts) //response to the client
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// view particular product details
exports.viewproduct = async (req, res) => {

    const id = req.params.id

    try {
        const product = await products.findOne({ id })

        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(401).json('products not found')
        }

    }
    catch {
        res.status(401).json(err)
    }
}

