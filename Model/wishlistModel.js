const mongoose = require('mongoose');
const booksModel = require('./bookModel')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    book_ID: {
        type: Schema.Types.ObjectId,
        ref: 'bookDB',
        require: true
    },
    
},
    { timestamps: true })

let wishlistModel = mongoose.model('wishlists_Items', userSchema)
module.exports = wishlistModel


class wishlist_items_Model {

    add_to_wishlist_Model = (addToWishlist_data, callback) => {
        
        console.log("We are inside the Model's add_to_wishlist_Model function")
        
        booksModel.getBookInfoById(addToWishlist_data, (data, err)=>{
            if(data){
                console.log('Book info in wishlist model : ',data)
                
                if(data.status === 200){
                    let wishlistItemData = {
                        userID: addToWishlist_data.userID,
                        book_ID: addToWishlist_data.book_id,
                    
                    }
    
                    console.log('wishlistItemData : ',wishlistItemData)
                    return wishlistModel.create(wishlistItemData)
                    .then(data=>{
                        console.log('Successfully added in the wishlist')
                        callback({message: 'Successfully added to the wishlist', success: true, data: data, status: 200 });
                    }).catch(err=>{
                        console.log('Error failed to add in the wishlist')
                        callback({message: 'Error failed to add to the wishlist', success: false, err: err, status: 400 });
                    })
                }else if(data.success === false){
                    callback(data)
                }
                
            }else if(err){
                console.log('Error failed to find the book info')
                callback(err)
            }
        })
    }


    getAll_wishlist_Items_Model = (userID) => {
        
        console.log("We are inside the Model's getAll_wishlist_Items_Model function")
        return new Promise((resolve, reject) => {
            wishlistModel.find({ userID: userID }).populate('book_ID')
            .then((result) => {
                console.log(result)
                resolve(result)
            }).catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    }

    remove_wishlist_item_Model = (obj, callback) => {
        
        console.log("We are inside the Model's remove_wishlist_item_Model function")
        console.log('removeBook-ID : ',obj.removeBook_id)
        return wishlistModel.findByIdAndDelete(obj.removeBook_id, (err, data)=>{
            if(err){
                console.log('Error book not found',err)
                callback({ message: 'Error book not found', success: false, status: 400 })
            }else {
                if(!data){
                    console.log('Error book not found') 
                    callback({ message: 'Error book not found', success: false, status: 400  })
                }else if(data){
                    console.log('Successfully removed from the wishlist',data)
                    callback({ message: 'Successfully removed from the wishlist', success: true, data: data, status: 200 })
                }
            }
        })
    }

    
    
}

module.exports = new wishlist_items_Model();

