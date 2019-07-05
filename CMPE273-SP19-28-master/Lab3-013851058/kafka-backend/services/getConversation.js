
var mongooseTypes = require('mongoose').Types;
var Message = require('../../Backend/model/Conversation');

//Get courses for a user
function handle_request(message, callback){
    console.log('Inside Kafka Method get Conversation  Message ', message);
        Message.find({
            $or: [{"FromUser": message.id}, {"ToUser": message.id}]
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
