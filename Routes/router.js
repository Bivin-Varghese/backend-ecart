// to define routes for the client request 


// import express 
const express = require('express');


//import production controller
const productController = require('../Controllers/productController')

//import wishlist
const wishlistController = require('../Controllers/wishlistController')

// import cartcontroller 
const cartController = require('../Controllers/cartController')

//using express create an object for router class inorder to setup path
const router = new express.Router();

//resolve various client request

// api call 
// 1.get all products
router.get('/products/allProducts', productController.getallproducts)

// 2.view particular product
router.get('/products/viewProduct/:id', productController.viewproduct)

//3.add to wishlist
router.post('/products/addtowishlist', wishlistController.addtowishlist)

//4.get wishlist details
router.get('/products/wishlist', wishlistController.getwishlist)

//5.delete wishlist products
router.delete('/products/deletewishlist/:id', wishlistController.deletewishlist)

//6.add to cart
router.post('/products/addtocart', cartController.addtocart)

//7.get cart products
router.get('/products/getcart', cartController.getcart)

//8.delete cart products
router.delete('/products/deletecart/:id', cartController.delete)

//9.increment cart count
router.get('/products/increment/:id', cartController.incrementCartItems)

//10.decrement cart item
router.get('/products/decrement/:id', cartController.decrementCartItems)

// export router 
module.exports = router
