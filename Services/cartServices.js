const cartModel = require('../Model/cartModel')


class Add_To_Cart_Services{

    add_to_cart_Services = (addToCart_data, callback) => {

        console.log("We are inside the service's add_to_cart_Services function")
        
        cartModel.add_to_cart_Model(addToCart_data, (data, err)=>{
            if(data){
                console.log('data in services : ',data)
                callback(data)
            }else if(err){
                console.log('err in services : ',err)
                callback(err)
            }

        })

    }

    getAll_cart_Items_Services = (userID) =>{
        
        console.log("We are inside the service's getAll_cart_Items_Services function")
        
        return cartModel.getAll_cart_Items_Model(userID).then(result=>{
            console.log('result in services : ',result)
            return ({ message: "Cart records found", success: true, data: result, code: 200 })
        }).catch((error) => {
            console.log('error in services : ',error)
            return ({ message: "Error Cart records not found", success: false, error: error, code: 400 })
        })
    }


    remove_cart_item_Services = (obj, callback) => {

        console.log("We are inside the service's remove_cart_item_Services function")
        cartModel.remove_cart_item_Model(obj, (data, err)=>{
            if(data){
                 callback(data)
            }else if(err){
                callback(err)
            }
        })
    }


    update_cart_item_Quantity_Services = (data, callback) => {

        console.log("We are inside the service's update_cart_item_Quantity_Services function")
        cartModel.update_cart_item_Quantity_Model(data, (data, err)=>{
            if(data){
                callback(data)
            }else if(err){
                callback(err)
            }
        })
    }

}


module.exports = new Add_To_Cart_Services();