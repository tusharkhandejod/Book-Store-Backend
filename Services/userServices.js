const bookUser = require('../Model/userModel');

class BookServices {

    register = (data, callback) => {

        console.log("We are inside the service's registration function")
        return bookUser.register(data).then((res)=>{
            console.log('res in services : ',res)
            return callback({ message: "Registration successfull", data: res })
        }).catch(err=>{
            console.log(err)
            return callback({ message: "Registration failed", data: err })
        })

    }

    login = (loginData, callback) => {
        console.log("We are inside the service's login function")
        
        return bookUser.login(loginData, (data, err)=>{
            if(data){
                return callback(null,data)
            }else if(err){
                return callback(err)
            }
        })
    }
    
    

}

module.exports = new BookServices();