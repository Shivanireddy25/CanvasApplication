var Assignment = require('../../Backend/model/Assignment');

//Get a particular course
function handle_request(message, callback){
    console.log('Inside Kafka Method Get Course. Message ', message);

    Assignment.findOne({
            _id  : message
        }, function (err, course) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else {
                console.log(course);  
                callback(null,course);
            }
        });
}

exports.handle_request = handle_request;