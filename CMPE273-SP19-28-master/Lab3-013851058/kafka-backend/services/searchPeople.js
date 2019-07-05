var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');


function handle_request(message, callback){
    console.log('Inside Kafka Method Search People. Message ', message);
   console.log(message.id);
   
   User.find({
    "name" :  new RegExp(message.id)
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