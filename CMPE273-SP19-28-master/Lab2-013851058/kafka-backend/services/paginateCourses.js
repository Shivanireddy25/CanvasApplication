var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Courses = require('../../Backend/model/Courses');


function handle_request(msg, callback){

    let courses ={};
    let limit = Number(msg.limit);
    skip = limit * Number(msg.page);
    let searchTerm = msg.searchTerm;
    console.log("Serac",searchTerm);
    if(searchTerm){
        Courses.find({ "CourseId" : new RegExp(searchTerm)}, [], {skip, limit}, (err, result) => {
       
            if (err) {
               console.log("Error")
            }
            else {
                courses.message = "success";
                courses.data = result;
                callback(null, courses);
            }
        })
    } else {
        
        Courses.find({}, [], {skip, limit}, (err, result) => {
       
        if (err) {
            console.log("Error");
        }
        else {
            courses.message = "success";
            courses.data = result;
            callback(null, courses);
        }
    })
}

}

exports.handle_request = handle_request;