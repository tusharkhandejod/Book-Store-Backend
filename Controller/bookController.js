const services = require('../Services/bookServices');
const { response } = require('express');

const addBookController = (req, res) => {
   
    console.log("We are inside the controller's addBookController function")
    
    let bookData = {
        bookname: req.body.bookname,
        author: req.body.author,
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        isCart: req.body.isCart,
        isWishlist: req.body.isWishlist

    }
    
    let response = {};
    services.addBookServices(bookData, (data, err)=>{
        if(data){
            console.log('data : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(200).send(response);
        }else if(err){
            console.log('err : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response);
        }
    })

}

const updateBookController = (req, res) => {
   
    console.log("We are inside the controller's updateBookController function")
    
    let response = {};
     services.updateBookServices(req, (data, err)=>{
        if(data){
            console.log('data : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(200).send(response);
        }else if(err){
            console.log('err : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response);
        }
    })
  

}

const deleteBookController = (req,res) =>{

    console.log("We are inside the controller's deleteBookController function")
    console.log('deleteBook_id : ',req.params.id)
    let response = {};
    services.deleteBookServices(req, (data, err)=>{
        if(data){
            console.log('data : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(200).send(response);
        }else if(err){
            console.log('err : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response);
        }
    })
    
    

}

const getAllBooksController = (req,res) => {
     
    console.log("We are inside the controller's getAllBooksController function")
    let response = {};
    services.getAllBooksServices().then((result) => {
        response.success = result.success;
        response.message = result.message;
        response.data = result.data;
        return res.status(200).send(response);
    }).catch((error) => {
        response.success = false;
        response.message = error.message;
        response.error = error.error;
        return res.status(400).send(response);
    })
}


const getInfoBySearch = (req, res, next) => {
    
    
    services.getInfoBySearchServices(req, (data, err)=>{
        if(data){
            console.log('data in controoler : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response);
        }else if(err){
            console.log('err in controoler : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(err.status).send(response);
        }
    })

}


const sort_by_higher_to_lower_controller = (req, res) => {
    
    services.sort_by_higher_to_lower_Services(req, (data, err)=>{
        if(data){
            console.log('data in controoler : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response);
        }else if(err){
            console.log('err in controoler : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(err.status).send(response);
        }
    })
}

const sort_by_lower_to_higher_controller = (req, res) => {
    
    services.sort_by_lower_to_higher_services(req, (data, err)=>{
        if(data){
            console.log('data in controoler : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response);
        }else if(err){
            console.log('err in controoler : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(err.status).send(response);
        }
    })
}


const sort_by_newest_first_controller = (req, res) => {
    
    services.sort_by_newest_first_Services(req, (data, err)=>{
        if(data){
            console.log('data in controoler : ',data)
            response.success = data.success;
            response.message = data.message;
            response.data = data.data;
            return res.status(data.status).send(response);
        }else if(err){
            console.log('err in controoler : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(err.status).send(response);
        }
    })
}


module.exports = {
    addBookController, 
    updateBookController, 
    deleteBookController, 
    getAllBooksController,
    getInfoBySearch,
    sort_by_higher_to_lower_controller,
    sort_by_lower_to_higher_controller,
    sort_by_newest_first_controller
}