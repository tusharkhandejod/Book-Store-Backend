
const cartServices = require('../Services/cartServices')
const { response } = require('express');

const add_to_cart_Controller = (req, res) => {

    console.log("We are inside the controller's add_to_cart_Controller function")
    let addToCart_data = {
        userID: req.decoded.id,
        book_id: req.params.id
    }

    let response = {}
    cartServices.add_to_cart_Services(addToCart_data, (data, err) => {
        if (data) {
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.send(response);
        } else if (err) {
            response.success = err.success;
            response.message = err.message;
            return res.send(response);
        }
    })

}


const getAll_cart_Items_Controller = (req, res) => {

    console.log("We are inside the controller's getAll_cart_Items_Controller function")
    console.log(req.decoded)
    let userID = req.decoded.id
    console.log('userID : ', userID)
    
    let response = {};
    cartServices.getAll_cart_Items_Services(userID).then((result) => {
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

const remove_cart_item_Controller = (req, res) => {
    
    console.log("We are inside the controller's remove_cart_item_Controller function")
    
    let response = {};
    let obj = {
        removeBook_id: req.params.id
    }
    console.log('obj : ',obj)
    cartServices.remove_cart_item_Services(obj, (data, err)=>{
        if(data){
            console.log('data in controller : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(200).send(response)
        }else if(err){
            console.log('err in controller : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response)
        }
    })

}

const update_cart_item_Quantity_Controller = (req, res) => {
    
    console.log("We are inside the controller's update_cart_item_Quantity_Controller function")
    
    let data = {
        updateCartItem_ID : req.params.id,
        data: req.body
    }

    console.log('data : ',data)
    let response = {};
    cartServices.update_cart_item_Quantity_Services(data, (data, err)=>{
        if(data){
            console.log('data in the controller : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response)
        }else if(err){
            console.log('err in controller : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response)
        }
    })
}


module.exports = {
    add_to_cart_Controller,
    getAll_cart_Items_Controller,
    remove_cart_item_Controller,
    update_cart_item_Quantity_Controller
}