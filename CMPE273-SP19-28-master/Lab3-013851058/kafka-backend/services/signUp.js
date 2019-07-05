var User = require('../../Backend/model/User');
require("../../Backend/mongoose");
const bcrypt = require('bcrypt');

function handle_request(msg, callback){
    console.log("Inside signUp Page");
    console.log(msg);
    var p = bcrypt.hashSync(msg.password, bcrypt.genSaltSync(8), null);
    console.log(p);
   
    var new_user = new User ({
        name : msg.name,
        email : msg.email,
        password : p,
        userType : msg.userType
    })

    new_user.save().then((doc) => {

        console.log("User saved successfully.", doc);
        callback(null, doc);

    }, (err) => {
        console.log("Unable to save user details.", err);
        callback(err, null);
    });   
};

exports.handle_request = handle_request;