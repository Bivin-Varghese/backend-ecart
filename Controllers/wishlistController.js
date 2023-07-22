//import wishlistSchema

const wishlists = require('../model/wishlistSchema')

// logic for wishlist 
//get all products from wishlist
exports.addtowishlist = async (req, res) => {
    // get specific product details from the request

    //req.body={
    //         "id":"123",
    //         "title":"backpack",
    //         "price":"1554",
    //     }

    // js destructuring 
    const { id, title, price, image } = req.body

    // logic for wishlist 

    try {
        //check if product is already in wishlist
        const item = await wishlists.findOne({ id })

        if (item) {
            res.status(401).json('item already in wishlist')
        }
        else {
            // produc is added to wishlist
            const newProduct = await wishlists({ id, title, price, image })

            // to store in db 
            await newProduct.save()
            res.status(200).json('item added to wishlist')
        }



    }
    catch (error) {
        res.status(404).json(error)
    }

}

// get wishlist products from db 
exports.getwishlist = async (req, res) => {
    try {
        const allwishlist = await wishlists.find()
        res.status(200).json(allwishlist)
    }
    catch (error) {
        res.status(404).json(error)
    }
}



//delete wishlist products from db
exports.deletewishlist = async (req, res) => {
    //get particular id
    const { id } = req.params

    try {
        // logic
        const removewishlist = await wishlists.deleteOne({ id })
        if (removewishlist) {
            //get wishlist products after removing particular product
            const remainingwishlist = await wishlists.find()
            res.status(200).json(remainingwishlist)
        }
    }
    catch (error) {
        res.status(404).json(error)
    }


}
