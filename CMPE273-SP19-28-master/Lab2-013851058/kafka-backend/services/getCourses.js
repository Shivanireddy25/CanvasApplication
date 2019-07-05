var mongooseTypes = require('mongoose').Types;
var User = require('../../Backend/model/User');
var Course = require('../../Backend/model/Courses');

//Get courses for a user
function handle_request(message, callback){
    console.log('Inside Kafka Method Get Courses. Message ', message);

   

        Course.find( { $and: [{"name" : message.name }, { $or: [ { "Status": "ENROLLED" }, { "Status" : "CREATED"} ] }]}, function (err, user) {
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