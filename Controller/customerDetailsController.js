const customerDeatilsServices = require('../Services/customerDetailsServices')

const add_Customers_Details_Controller = (req,res) => {
    
    console.log("We are inside the controller's add_Customers_Details function")
    let obj = {
        userID: req.decoded.id,
        fullname: req.body.fullname,
        mobile: req.body.mobile,
        pincode: req.body.pincode,
        locality: req.body.locality,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        addresstype: req.body.addresstype
    }

    console.log('obj : ',obj)
    let response = {}
    customerDeatilsServices.add_Customers_Details_Services(obj, (data, err)=>{
        if(data){
            console.log('data in the controller : ',data)
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
    add_Customers_Details_Controller
}