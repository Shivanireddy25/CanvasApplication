var mongooseTypes = require('mongoose').Types;
var Quiz = require('../../Backend/model/Quiz');

//Get courses for a user
function handle_request(message, callback){
    console.log('Inside Kafka Method get Quizs. Message ', message);

   

        Quiz.find({
            courseId : message.courseId
        }, function (err, quiz) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log(quiz);
                callback(null, quiz);
            }
        });
}

exports.handle_request = handle_request;