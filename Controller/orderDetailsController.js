const orderDetailsServices = require('../Services/orderDetailsServices')


const add_Order_details_controller = (req, res) => {
    console.log('req.decoded : ',req.decoded)
    console.log('req.body : ',req.body)
    console.log('req.body.orders : ',req.body.orders)
    
    let orderDetailsData = {
        userID: req.decoded.id,
        book_ID: req.body.orders[0].book_ID,
        order_ID: req.body.orders[0].order_ID,
        quantity: req.body.orders[0].quantity
    }
    
    let response = {}
    orderDetailsServices.add_Order_details_Services(orderDetailsData, (data, err) => {
        if (data) {
            console.log('data in the controller : ', data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response);
        } else if (err) {
            response.success = err.success;
            response.message = err.message;
            return res.send(response);
        }

    })
}




module.exports = {
    add_Order_details_controller
}