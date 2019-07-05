var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Courses = require('../../Backend/model/Courses');


function handle_request(message, callback){
    console.log('Inside Kafka Method Search Course. Message ', message);
   console.log(message.id);
   
    Courses.find({
            "CourseId" :  new RegExp(message.id),
            Status : "CREATED"
        }, function (err, course) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log(course);
                callback(null, course);
            }
        });
}

exports.handle_request = handle_request;