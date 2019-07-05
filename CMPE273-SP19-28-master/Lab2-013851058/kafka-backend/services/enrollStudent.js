var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Courses = require('../../Backend/model/Courses');


function handle_request(message, callback){
    console.log('Inside Kafka Method Create Course. Message ', message);
   console.log(message.id);
   
    Courses.findOneAndUpdate(
        { "_id" : message.id,  "name" : message.name},
        { "Status" : "ENROLLED" },
            function (err, course) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log(course);
                course.Status = "ENROLLED";
                course.save().then((doc) => {

                    console.log("Course Enrolled for student successfully.", doc);
                    callback(null, doc);
        
                }, (err) => {
                    console.log("Course Enrollment Failed", err);
                    callback(err, null);
                });
                
            }
        });
}

exports.handle_request = handle_request;