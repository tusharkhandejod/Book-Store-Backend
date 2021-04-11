const mongoose = require('mongoose');
const bcryptCheck = require('../Middleware/bcryptfile');
const jwtToken = require('../Middleware/jwtToken');

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    // role: {
    //     type: String,
    //     required: true
    // }
},
    { timestamps: true })

let bookUser = mongoose.model('User', userSchema)
module.exports = bookUser

class BookModel{
    
    register = (data) => {

        console.log("We are inside the Model's registration function")
        console.log('data : ',data)
        var inputPassword = data.password
        var hashpass = bcryptCheck.encodePassword(inputPassword)
        console.log('hashpass : ',hashpass)
        let user = {
            fullname: data.fullname,
            email: data.email,
            password: hashpass,
            mobile: data.mobile,
            role: data.role
        }

        console.log('user : ',user)
        
        return bookUser.create(user).then(result => {
            console.log('data successfully added on database')
            return result;
        }).catch(error => {
            console.log('Error failed to add data on database')
            return error;
        })
        

    }

    login = (loginData, callback) => {

        console.log("We are inside the Model's login function")
        console.log('loginData : ',loginData)

        bookUser.findOne({ 'email': loginData.email }, (err, user) => {

            if (err) {
                console.log(err)
                return callback({ 'message': "Login failed because user not found", 'success': false })
            } else {
                if(!user){
                    console.log('Email ID not exists')
                    return callback({ 'message': "Login failed because mail ID not exists", 'success': false })
                }
                if (user) {
                    console.log('Found record : ', user)
                    let payload = {
                        "email": user.email,
                        "id": user._id
                    }
                    
                    bcryptCheck.VerifyPassword(loginData.password, user.password).then(data => {
                        if (data === true) {
                            console.log('Login Successfull')
                            let loginToken = jwtToken.generateToken(payload);
                            console.log('Login Token : ', loginToken)
                            console.log(user)
                            return callback({ 'message': "Login successfull", 'success': true, 'token': loginToken.token })
                            
                        }else if(data === false){
                            console.log('Login failed')
                            return callback({ 'message': "Login failed because password did not matched", 'success': false })
                        }

                    }).catch(err => {
                        console.log(err)
                        return callback(err)
                    })

                } else {
                    console.log('Record not found : ', data)
                    return callback(err)
                }
            }
        })



    }
}


module.exports = new BookModel();
