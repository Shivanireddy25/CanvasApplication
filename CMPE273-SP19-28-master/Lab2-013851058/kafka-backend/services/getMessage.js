var mongooseTypes = require('mongoose').Types;
var Message = require('../../Backend/model/Conversation');

//Get a particular course
function handle_request(message, callback){
    console.log('Inside Kafka Method Get Message ', message);

        Message.findOne({
            $or: [{$and:[{"FromUser":message.id},{"sub":message.sub}]},{$and:[{"ToUser":message.id},{"sub":message.sub}]}]
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
                callback(null,course);
            }
        });
}

exports.handle_request = handle_request;


