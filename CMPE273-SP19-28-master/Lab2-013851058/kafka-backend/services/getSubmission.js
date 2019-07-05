var mongooseTypes = require('mongoose').Types;
var Submissions = require('../../Backend/model/Submissions');

//Get courses for a user
function handle_request(message, callback){
    console.log('Inside Kafka Method get Submission. Message ', message);
    Submissions.find({
            _id : message.id
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
             //   console.log(course.assignments);
                callback(null, course);
            }
        });
}

exports.handle_request = handle_request;