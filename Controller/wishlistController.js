const wishlistServices = require('../Services/wishlistServices')
const { response } = require('express');


const add_to_wishlist_Controller = (req, res) => {

    console.log("We are inside the controller's add_to_cart_Controller function")
    let addToWishlist_data = {
        userID: req.decoded.id,
        book_id: req.params.id
    }

    
    let response = {}
    wishlistServices.add_to_wishlist_Services(addToWishlist_data, (data, err) => {
        if (data) {
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response);
        } else if (err) {
            response.success = err.success;
            response.message = err.message;
            return res.status(err.status).send(response);
        }
    })

}


const getAll_wishlist_Items_Controller = (req, res) => {

    console.log("We are inside the controller's getAll_wishlist_Items_Controller function")
    console.log(req.decoded)
    let userID = req.decoded.id
    console.log('userID : ', userID)
    let response = {};
    wishlistServices.getAll_wishlist_Items_Services(userID).then((result) => {
        response.success = result.success;
        response.message = result.message;
        response.data = result.data;
        return res.status(200).send(response);
    }).catch((error) => {
        response.success = false;
        response.message = error.message;
        response.error = error.error;
        return res.status(400).send(response);
    })
}

const remove_wishlist_item_Controller = (req, res) => {
    
    console.log("We are inside the controller's remove_wishlist_item_Controller function")
    
    let response = {};
    let obj = {
        removeBook_id: req.params.id
    }
    console.log('obj : ',obj)
    wishlistServices.remove_wishlist_item_Services(obj, (data, err)=>{
        if(data){
            console.log('data in controller : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response)
        }else if(err){
            console.log('err in controller : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(err.status).send(response)
        }
    })

}




module.exports = {
    add_to_wishlist_Controller,
    getAll_wishlist_Items_Controller,
    remove_wishlist_item_Controller

}