const mongoose = require('mongoose');

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
    order_ID: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    
},
    { timestamps: true })

let orderDetailsModel = mongoose.model('order_details', userSchema)
module.exports = orderDetailsModel

class orderModel {
    

    
    add_Order_details_Model = (orderDetailsData, callback) => {
        
        console.log("We are inside the Model's add_Order_details_Model function")
        console.log('orderDetailsData : ',orderDetailsData)
        orderDetailsModel.create(orderDetailsData, (err, data)=>{
            if(err){
                console.log('err : ',err)
                console.log('Error failed to store the order details')
                   
            }else if(data){
                console.log('data : ',data)
                console.log('Successfully stored order details')
                
            }
        })
        
        
        
        
        orderDetailsModel.populate(orderDetailsData, {path:"book_ID"}, function(err, result) { 
            if(err){
                console.log('err : ',err)
                console.log('Error failed to store the order details')
                callback(err)
            }else if(result){
                console.log('result : ',result)
                console.log('Successfully stored order details')
                callback(result)
            }
        })
        

    }
}

module.exports = new orderModel();
