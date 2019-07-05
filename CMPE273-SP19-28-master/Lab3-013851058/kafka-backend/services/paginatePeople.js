var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Courses = require('../../Backend/model/Courses');


function handle_request(message, callback){
  console.log("Inside Paginate people");
    let users ={};
    let limit = Number(message.limit);
    skip = limit * Number(message.page);
    let searchTerm = message.searchTerm;
    console.log("Serac",searchTerm);
    if(searchTerm){
        User.find({ "name" : new RegExp(searchTerm)}, [], {skip, limit}, (err, result) => {
       
            if (err) {
               console.log("Error")
            }
            else {
                users.message = "success";
                users.data = result;
                callback(null, users);
            }
        })
    } else {
        
        User.find({}, [], {skip, limit}, (err, result) => {
       
        if (err) {
            console.log("Error");
        }
        else {
            users.message = "success";
            users.data = result;
            callback(null, users);
        }
    })
}

}

exports.handle_request = handle_request;