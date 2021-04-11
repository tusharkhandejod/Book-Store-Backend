const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    bookname: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isCart: {
        type: Boolean,
        required: true,
        default: false
    },
    isWishlist: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true })

let booksModel = mongoose.model('bookDB', userSchema)
module.exports = booksModel

class BookStoreModel {


    addBookModel = (books, callback) => {
        console.log("We are inside the Model's addBookModel function")
        console.log('books : ', books)
        return booksModel.create(books).then(result => {
            console.log('Book information successfully added on database')
            return callback(result);
        }).catch(error => {
            console.log('Error failed to add book information on database')
            return callback(error);
        })
    }

    deleteBookModel = (req, callback) => {

        console.log("We are inside the Model's deleteBookModel function")
        return booksModel.findByIdAndDelete(req.params.id, (err, data) => {
            if (err) {
                console.log('Error failed to delete because book of given id is not found')
                callback({ 'message': "Error failed to delete because book of given id is not found", 'success': false })
            } else {

                if (!data) {
                    console.log('Book of given id not exists')
                    callback({ 'message': "Error failed to delete because book of given id not exists", 'success': false })
                } else if (data) {
                    console.log('Book found : ', data)
                    console.log('Successfully deleted')
                    return callback({ 'message': "Successfully deleted", 'success': true, data: data })
                }

            }
        })
    }

    updateBookModel = (updateBookData, callback) => {

        console.log("We are inside the Model's updateBookModel function")
        console.log('updateBookData : ', updateBookData)
        return booksModel.findByIdAndUpdate(updateBookData.id, updateBookData.data, { new: true }, (err, data) => {
            if (err) {
                console.log('Error failed to update book information')
                callback({ 'message': "Error failed to update because book of given id is not found", 'success': false, err: err })
            } else {

                if (!data) {
                    console.log('Book of given id not exists')
                    callback({ 'message': "Error failed to update because book of given id not exists", 'success': false })
                } else if (data) {
                    console.log('Book found : ', data)
                    console.log('Successfully updated')
                    return callback({ 'message': "Successfully updated", 'success': true, data: data })
                }
            }


        })
    }

    getAllBooksModel = (req) => {

        console.log("We are inside the Model's getAllBooksModel function")
        try {
            console.log("Book database is reading")
            return new Promise((resolve, reject) => {
                booksModel.find(req).then((result) => {
                    console.log(result)
                    resolve(result)
                }).catch((error) => {
                    console.log(error)
                    reject(error)
                })
            })
        } catch (error) {

        }

    }

    getBookInfoById = (addToCart_data, callback) => {
        console.log("We are inside the Model's getBookInfoById function")
        console.log('addToCart_data : ', addToCart_data)
        booksModel.findById(addToCart_data.book_id, (err, data) => {
            if (err) {
                console.log("Error book not found")
                callback({ message: 'Error book not found', success: false, status: 400 })
            } else {

                if (!data) {
                    console.log('Error book does not exists')
                    callback({ message: 'Error book not found', success: false, status: 400 })
                }
                if (data) {
                    console.log('Book found : ', data)
                    callback({ message: 'Book found', success: true, data: data, status: 200 })
                }
            }
        })
    }

    getInfoBySearchModel = (req, callback) => {

        console.log("We are inside the Model's getInfoBySearchModel function")
        const searchedField = req.query.input;
        booksModel.find({
            "$or": [
                { bookname: {$regex: searchedField, $options: 'i'}},
                { author: {$regex: searchedField, $options: 'i'}}
            ]
        }).then((data)=>{
            console.log('Searched data : ',data)
            callback(data)
        }).catch((err)=>{
            console.log('err',err)
            callback(err)
        })


    }


    sort_by_higher_to_lower_Model = (req, callback) => {

        console.log("We are inside the Model's sort_by_higher_to_lower_Model function")
        booksModel.find({}).sort({ "price": -1}).exec(function(err,data){
           if(err){
               console.log('err in model : ',err)
               callback(err)
            }else if(data){
               console.log('Success in model : ',data)
               callback(data)
            }
        })

    }

    sort_by_lower_to_higher_Model = (req, callback) => {

        console.log("We are inside the Model's sort_by_lower_to_higher_Model function")
        booksModel.find({}).sort({ "price": 1}).exec(function(err,data){
           if(err){
               console.log('err in model : ',err)
               callback(err)
            }else if(data){
               console.log('Success in model : ',data)
               callback(data)
            }
        })

    }


    sort_by_newest_first_Model = (req, callback) => {

        console.log("We are inside the Model's sort_by_newest_first_Model function")
        booksModel.find({}).sort({ "createdAt": -1}).exec(function(err,data){
           if(err){
               console.log('err in model : ',err)
               callback(err)
            }else if(data){
               console.log('Success in model : ',data)
               callback(data)
            }
        })

    }



}





module.exports = new BookStoreModel();

