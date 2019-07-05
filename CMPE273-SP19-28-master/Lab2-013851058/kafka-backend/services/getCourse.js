var mongooseTypes = require('mongoose').Types;
var Course = require('../../Backend/model/Courses');

//Get a particular course
function handle_request(message, callback){
    console.log('Inside Kafka Method Get Course. Message ', message);

        Course.findOne({
            CourseId : message
        }, function (err, course) {
            if (err) {
                console.log("Error", err);
                
            }
            else {
                console.log(course);  
                callback(null,course);
            }
        });
}

exports.handle_request = handle_request;