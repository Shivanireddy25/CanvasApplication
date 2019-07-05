var mongooseTypes = require('mongoose').Types;
var Course = require('../../Backend/model/Courses');

//Get courses for a user
function handle_request(message, callback){
    console.log('Inside Kafka Method Create Course. Message ', message);
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
                console.log(course.announcements);
                callback(null, course.announcements);
            }
        });
}

exports.handle_request = handle_request;

