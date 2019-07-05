var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');

//Get a particular user
function handle_request(message, callback){
    console.log('Inside Kafka Method Get Profile Message ', message);

        User.findOne({
            name : message.name
        }, function (err, user) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('User does not exist');
            }
            else {
                console.log(user);  
                callback(null,user);
            }
        });
}

exports.handle_request = handle_request;