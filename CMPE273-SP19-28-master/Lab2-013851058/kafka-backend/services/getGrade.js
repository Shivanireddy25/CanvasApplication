var mongooseTypes = require('mongoose').Types;
var grade = require('../../Backend/model/Grade');

//Get courses for a user
function handle_request(message, callback){
    console.log('Inside Kafka Method Get Grade. Message ', message);

   

        grade.find({
            name : message.name,
            CourseId : message.courseId
        }, function (err, user) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log(user);
               
                callback(null, user);
            }
        });
}

exports.handle_request = handle_request;