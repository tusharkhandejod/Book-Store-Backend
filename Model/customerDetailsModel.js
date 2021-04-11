const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    fullname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    locality: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    addresstype: {
        type: String,
        required: true
    }
},
    { timestamps: true })

let customerDetailsModel = mongoose.model('Buyers_details', userSchema)
module.exports = customerDetailsModel


class customerModel {


    add_Customers_Details_Model = (obj, callback) => {

        console.log("We are inside the Model's add_Customers_Details_Model function")
        console.log('obj : ',obj)
        return customerDetailsModel.create(obj).then(result=>{
            console.log('result : ',result)
            console.log('Successfully stored customer details')
            callback(result)
        }).catch(err=>{
            console.log('err : ',err)
            console.log('Error failed to store the customer details')
            callback(err)
        })
    }
}

module.exports = new customerModel();
