var mongooseTypes = require('mongoose').Types;
var Course = require('../../Backend/model/Courses');

//Get courses for a user
function handle_request(message, callback){
    console.log('Inside Kafka Method get Assignment. Message ', message);
        Course.findOne({
            CourseId : message.courseId
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
                console.log(course.assignments);
                callback(null, course.assignments);
            }
        });
}

exports.handle_request = handle_request;