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
    quantity: {
        type: Number,
        required: true,
        default: 1
    }


},
    { timestamps: true })

let cartModel = mongoose.model('cart_Items', userSchema)
module.exports = cartModel

class cart_items_Model {
    // Model.find({ $and: [ { $or: [{title: regex },{description: regex}] }, {category: value.category}, {city:value.city} ] })
    add_to_cart_Model = (addToCart_data, callback) => {
        console.log("We are inside the Model's add_to_cart_Model function")
        console.log('addToCart_data : ', addToCart_data)
        cartModel.find({
            "$and": [
                { userID: addToCart_data.userID },
                { book_ID: addToCart_data.book_id }
            ]
        }).then(data => {
            console.log('Both fields matched : ', data)
            console.log("data.length : ", data.length)

            if (data.length !== 0) {

                let prevQuantity = data[0].quantity + 1
                console.log('prevQuantity : ', prevQuantity)
                let updatedCartData = {
                    quantity: prevQuantity
                }
                cartModel.findByIdAndUpdate({ _id: data[0]._id }, updatedCartData, { new: true }).then(data => {
                    console.log('Quantity incremented')
                    callback({ message: 'Successfully added to the cart', success: true, data: data, status: 200 });
                }).catch(err => {
                    console.log('err : ', err)
                    callback({ message: 'Error failed to add to the cart', success: true, err: err, status: 400 })
                })

            } else if (data.length == 0) {

                let cartItemData = {
                    userID: addToCart_data.userID,
                    book_ID: addToCart_data.book_id,

                }

                console.log('cartItemData : ', cartItemData)
                return cartModel.create(cartItemData)
                    .then(data => {
                        console.log('Successfully added in the cart')
                        callback({ message: 'Successfully added to the cart', success: true, data: data, status: 200 });
                        console.log('addToCart_data.book_id : ',addToCart_data.book_id)
                        // booksModel.findOneAndUpdate(addToCart_data.book_id, {isCart: "true"}, { new: true }).then(data=>{
                        //     console.log('updated isCart data : ', data)
                        // }).catch(err=>{
                        //     console.log('err',err)
                        // })
                    }).catch(err => {
                        console.log('Error failed to add in the cart')
                        callback({ message: 'Error failed to add to the cart', success: true, err: err, status: 400 });
                    })

            }
        }).catch(err => {
            console.log(err)
        })






    }


    getAll_cart_Items_Model = (userID) => {

        console.log("We are inside the Model's getAll_cart_Items_Model function")


        return new Promise((resolve, reject) => {
            cartModel.find({ userID: userID }).populate('book_ID')
                .then((result) => {
                    console.log(result)
                    resolve(result)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
        })
    }

    remove_cart_item_Model = (obj, callback) => {

        console.log("We are inside the Model's remove_cart_item_Model function")
        console.log('removeBook-ID : ', obj.removeBook_id)
        return cartModel.findByIdAndDelete(obj.removeBook_id, (err, data) => {
            if (err) {
                console.log('Error book not found', err)
                callback({ message: 'Error book not found', success: false })
            } else {
                if (!data) {
                    console.log('Error book not found')
                    callback({ message: 'Error book not found', success: false })
                } else if (data) {
                    console.log('Successfully removed from the cart', data)
                    callback({ message: 'Successfully removed from the cart', success: true, data: data })
                }
            }
        })
    }


    update_cart_item_Quantity_Model = (data, callback) => {

        console.log("We are inside the Model's remove_cart_item_Model function")
        console.log('data : ', data)
        return cartModel.findByIdAndUpdate(data.updateCartItem_ID, data.data, { new: true }, (err, data) => {
            if (err) {
                console.log('Error failed because book of given ID not found in the cart')
                callback({ 'message': "Error failed because book of given ID not found in the cart", 'success': false, status: 400 })
            } else {

                if (!data) {
                    console.log('Error failed because book of given ID not found in the cart')
                    callback({ 'message': "Error failed because book of given ID not found in the cart", 'success': false, status: 400 })
                } else if (data) {
                    console.log('Book found : ', data)
                    console.log('Quantity updated successfully')
                    return callback({ 'message': "Cart item quantity updated successfully", 'success': true, data: data, status: 200 })
                }
            }


        })
    }

}

module.exports = new cart_items_Model();
