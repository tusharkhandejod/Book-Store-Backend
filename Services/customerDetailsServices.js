const customerDetailsModel = require('../Model/customerDetailsModel')



class add_Customer_Details{

    add_Customers_Details_Services = (obj, callback) => {

        console.log("We are inside the service's add_Customers_Details_Services function")
        customerDetailsModel.add_Customers_Details_Model(obj, (data, err)=>{
            if(data){
                console.log('data in the services : ',data)
                callback({ message: 'Customers details added successfully', success: true, status: 200 , data: data })
            }else if(err){
                callback({ message: 'Error failed to add customers details', success: false, status: 400 , err: err })
            }
        })

    }

}

module.exports = new add_Customer_Details();