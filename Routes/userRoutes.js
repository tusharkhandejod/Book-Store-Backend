const express = require('express');
const router = express.Router();
const jwtToken = require('../Middleware/jwtToken');


const userController = require('../Controller/userController');
const bookController = require('../Controller/bookController');
const cartItemsController = require('../Controller/cartController');
const customerDetailsController = require('../Controller/customerDetailsController');
const wishlistItemsController = require('../Controller/wishlistController')
const orderDetailsController = require('../Controller/orderDetailsController')

//User
router.post('/user/register', userController.register);
router.post('/user/login',  userController.login);


//Admin books operations
router.post('/bookstore_user/admin/book/add', bookController.addBookController )
router.put('/bookstore_user/admin/book/update/:id', bookController.updateBookController )
router.delete('/bookstore_user/admin/book/delete/:id', bookController.deleteBookController )

//get all books API
router.get('/bookstore_user/book/getAllBooks', jwtToken.verifyToken, bookController.getAllBooksController)
router.get('/bookstore_user/books', bookController.getInfoBySearch)
router.get('/bookstore_user/books/sort_by_Higher_to_lower', bookController.sort_by_higher_to_lower_controller)
router.get('/bookstore_user/books/sort_by_Lower_to_higher', bookController.sort_by_lower_to_higher_controller)
router.get('/bookstore_user/books/sort_by_newest_first', bookController.sort_by_newest_first_controller)


//Cart API's
router.post('/book/add_to_cart/:id', jwtToken.verifyToken, cartItemsController.add_to_cart_Controller)
router.get('/book/get_cart_items', jwtToken.verifyToken, cartItemsController.getAll_cart_Items_Controller)
router.delete('/book/remove_cart_item/:id', jwtToken.verifyToken, cartItemsController.remove_cart_item_Controller)
router.put('/book/cart_item_quantity/:id', jwtToken.verifyToken, cartItemsController.update_cart_item_Quantity_Controller )


router.post('/bookstore_user/getting_customer_details', jwtToken.verifyToken, customerDetailsController.add_Customers_Details_Controller )

//Wishlist API's
router.post('/book/add_to_wishlist/:id', jwtToken.verifyToken, wishlistItemsController.add_to_wishlist_Controller)
router.get('/book/get_wishlist_items', jwtToken.verifyToken, wishlistItemsController.getAll_wishlist_Items_Controller)
router.delete('/book/remove_wishlist_item/:id', jwtToken.verifyToken, wishlistItemsController.remove_wishlist_item_Controller)


//Order details API
router.post('/add/order_details', jwtToken.verifyToken, orderDetailsController.add_Order_details_controller )

module.exports = router;