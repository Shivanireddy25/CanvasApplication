var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var course = require('../../Backend/model/Courses');

//Get a particular user
function handle_request(message, callback){
    console.log('Inside Kafka Method Get People Message ', message);

        course.find({
            'CourseId': message.courseId
        }, function (err, users) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('User does not exist');
            }
            else {
                console.log(users);  
                callback(null,users);
            }
        });
}

exports.handle_request = handle_request;
