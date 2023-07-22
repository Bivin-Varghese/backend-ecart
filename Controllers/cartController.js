//import cartSchema

const carts = require('../model/cartSchema')

exports.addtocart = async (req, res) => {
    // get product details from request 
    const { id, title, price, image, quantity } = req.body

    try {
        //check if product is already in cart then update the quantity and price
        const product = await carts.findOne({ id })
        if (product) {
            // if produt in cart increment the quantity
            product.quantity += 1
            product.grandTotal = product.price * product.quantity
            //save the change to the db
            product.save()
            //response back to the client
            res.status(200).json('item updated')

        }
        else {
            //else add to cart
            const newProduct = new carts({ id, title, price, image, quantity, grandTotal: price })
            // save new product 
            await newProduct.save()
            res.status(200).json('item added to the cart')
        }

    }
    catch (error) {
        res.status(401).json(error)
    }

}

//get cart items
exports.getcart = async (req, res) => {

    try {
        const allcartitems = await carts.find()
        res.status(200).json(allcartitems)
    }
    catch (error) {
        res.status(401).json(error)
    }
}


// cart delete 
exports.delete = async (req, res) => {
    //get product id from parameter
    const { id } = req.params
    try {
        const removecartitem = await carts.deleteOne({ id })
        if (removecartitem.deleteCount != 0) {
            //get all cart items  after removing particular cart item
            const allcartitems = await carts.find()
            res.status(200).json(allcartitems)
        }
    }
    catch (error) {
        res.status(401).json.error
    }
}

//increment cart item
exports.incrementCartItems = async (req, res) => {
    const { id } = req.params
    try {
        //check  if product present in cart
        const product = await carts.findOne({ id })
        if (product) {
            // update the quantity and grand total 
            product.quantity += 1
            product.grandTotal = product.quantity * product.price
            // save changes to the dp 
            await product.save()
            // send back the updated details  to client
            const allcartitems = await carts.find()
            res.status(200).json(allcartitems)
        }
        else {
            res.status(404).json('products not found')
        }
    }
    catch (error) {
        res.status(404).json(error)
    }

}


// decrement cart item
exports.decrementCartItems = async (req, res) => {
    const { id } = req.params
    try {
        //check  if product present in cart
        const product = await carts.findOne({ id })
        if (product) {
            // update the quantity and grand total
            product.quantity -= 1
            product.grandTotal = product.quantity * product.price

            if (product.quantity == 0) {
                //remove product from the cart
                const removecartitem = await carts.deleteOne({ id })
                const allcartitems = await carts.find()
                res.status(200).json(allcartitems)
            }
            else {
                product.grandTotal = product.quantity * product.price
                //save changes to db
                await product.save()
                // send back the updated details  to client
                const allcartitems = await carts.find()
                res.status(200).json(allcartitems)
            }

            // // save changes to the db
            // await product.save()
            // // send back the updated details  to client
            // const allcartitems = await carts.find()
            // res.status(200).json(allcartitems)
        }
        else {
            res.status(404).json('products not found')
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}
