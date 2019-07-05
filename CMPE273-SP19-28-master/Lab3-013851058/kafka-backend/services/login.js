var User = require('../../Backend/model/User');
var bcrypt = require('bcrypt');


function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');
    console.log('Message', msg);

    User.findOne({
        'name': msg.name
    }, (err, user) => {

        if (err) {
            console.log("Unable to login.", err);
            callback(err, null);
        }
        else {

            if(user){
                console.log("User details ", user);
                console.log(msg.password);
                console.log(user.password);
                if (!bcrypt.compareSync(msg.password, user.password)) {                
                    console.log('Invalid Credentials!');
                    callback(null, null);                
                }
                else {
                
                    callback(null, user);
                }
            }
            else{
                callback(null, null);
            }     
        }
    });
}

exports.handle_request = handle_request;