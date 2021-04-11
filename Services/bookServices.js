const booksModel = require('../Model/bookModel')

class BookStoreServices {

    addBookServices = (bookData, callback) => {
 
        console.log("We are inside the service's addBookServices function")
        
        booksModel.addBookModel(bookData, (data, err)=>{
            if(data){
                console.log('data : ',data)
                callback({ message: "Book information added successfully", success: true, data:data})
            }else if(err){
                console.log('err : ',err)
                callback({ message: "Error failed to add book information", success: false, err:err})
            }
        })
    }

    updateBookServices = (req, callback) => {
        
        console.log("We are inside the service's updateBookServices function")
        let book_id = req.params.id;
            console.log("book_id : "+book_id)
            let updateBookData = {
                id:req.params.id,
                data:req.body
            }

            booksModel.updateBookModel(updateBookData, (data, err)=>{
                if(data){
                    console.log('data in services : ',data)
                    callback(data)
                }else if(err){
                    console.log('err in services : ',err)
                    callback(err)
                }
            })

    }

    deleteBookServices = (req, callback) => {
  
        console.log("We are inside the service's updateBookServices function")
        booksModel.deleteBookModel(req, (data, err)=>{
            if(data){
               console.log('data in services : ',data)
               callback(data)
            }else if(err){
                console.log('err in services : ',err)
                callback(err)
            }
        })
    }

    getAllBooksServices = () => {

        console.log("We are inside the service's getAllBooksServices function")
        return booksModel.getAllBooksModel().then(result=>{
            return ({ message: "Book records found", success: true, data: result, code: 200 })
        }).catch((error) => {
            return ({ message: "Error book records not found", success: false, error: error, code: 401 })
        })
    }


    getInfoBySearchServices = (req, callback) => {
        
        console.log("We are inside the service's getInfoBySearchServices function")
        
        booksModel.getInfoBySearchModel(req, (data, err)=>{
            if(data){
                console.log('data in the services : ',data)
                callback({ message: 'Searched field data found', success: true, status: 200, data: data})
            }else if(err){
                console.log('err in the services : ',err)
                callback({ message: 'Error searched field data not found', success: false, status: 400, err: err})
            }
        })
    }


    sort_by_higher_to_lower_Services = (req, callback) => {

        console.log("We are inside the service's sort_by_higher_to_lower_Services function")
        booksModel.sort_by_higher_to_lower_Model(req, (data, err)=>{
            if(data){
                console.log('data in the services : ',data)
                callback({ message: 'Books in higher to lower price order', success: true, status: 200, data: data})
            }else if(err){
                console.log('err in the services : ',err)
                callback({ message: 'Error occured', success: false, status: 400, err: err})
            }
        })
    }

    sort_by_lower_to_higher_services = (req, callback) => {

        console.log("We are inside the service's sort_by_lower_to_higher_services function")
        booksModel.sort_by_lower_to_higher_Model(req, (data, err)=>{
            if(data){
                console.log('data in the services : ',data)
                callback({ message: 'Books in lower to higher price order', success: true, status: 200, data: data})
            }else if(err){
                console.log('err in the services : ',err)
                callback({ message: 'Error occured', success: false, status: 400, err: err})
            }
        })
    }

    sort_by_newest_first_Services = (req, callback) => {

        console.log("We are inside the service's sort_by_newest_first_Services function")
        booksModel.sort_by_newest_first_Model(req, (data, err)=>{
            if(data){
                console.log('data in the services : ',data)
                callback({ message: 'Books in the newest first order', success: true, status: 200, data: data})
            }else if(err){
                console.log('err in the services : ',err)
                callback({ message: 'Error occured', success: false, status: 400, err: err})
            }
        })
    }


}

module.exports = new BookStoreServices();
