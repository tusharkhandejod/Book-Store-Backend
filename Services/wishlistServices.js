const wishlistModel = require('../Model/wishlistModel')




class Add_To_Wishlist_Services{

    add_to_wishlist_Services = (addToWishlist_data, callback) => {

        console.log("We are inside the service's add_to_wishlist_Services function")
        console.log('addToWishlist_data',addToWishlist_data)
        wishlistModel.add_to_wishlist_Model(addToWishlist_data, (data, err)=>{
            if(data){
                console.log('data in services : ',data)
                callback(data)
            }else if(err){
                console.log('err in services : ',err)
                callback(err)
            }

        })

    }

    getAll_wishlist_Items_Services = (userID) =>{
        
        console.log("We are inside the service's getAll_wishlist_Items_Services function")
        return wishlistModel.getAll_wishlist_Items_Model(userID).then(result=>{
            console.log('result in services : ',result)
            return ({ message: "Wishlist records found", success: true, data: result, code: 200 })
        }).catch((error) => {
            console.log('error in services : ',error)
            return ({ message: "Error Cart records not found", success: false, error: error, code: 400 })
        })
    }


    remove_wishlist_item_Services = (obj, callback) => {

        console.log("We are inside the service's remove_wishlist_item_Services function")
        wishlistModel.remove_wishlist_item_Model(obj, (data, err)=>{
            if(data){
                 callback(data)
            }else if(err){
                callback(err)
            }
        })
    }


    

}


module.exports = new Add_To_Wishlist_Services();