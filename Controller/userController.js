const services = require('../Services/userServices');
const { response } = require('express');

const register = (req, res) => {

    console.log("We are inside the controller's registration function")

    let data = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
    }

    let response = {};
    services.register(data, (data, err) => {
        if (data) {
            console.log('data in controller : ',data)
            response.success = true;
            response.message = data.message;
            response.data = data.data;
            return res.status(200).send(response);
        } else if (err) {

            console.log('err in controller : ', err)
            response.success = false;
            response.message = err.message;
            return res.status(400).send(response);
        }
    })

}

const login = (req, res, next) => {

    console.log("controller login function is running")
   
    let loginData = {
        email: req.body.email,
        password: req.body.password,
    }
    
    let response = {};
    services.login(loginData, (err, data)=>{
        if(err){
            console.log('err in controller : ',err)
            response.success = err.success;
            response.message = err.message;
            return res.status(400).send(response);
        }else if(data){
            console.log('data in controller : ', data)
            response.success = data.success;
            response.message = data.message;
            response.token = data.token;
            return res.status(200).send(response);
        }
    })


}

module.exports = {
    register, login
}