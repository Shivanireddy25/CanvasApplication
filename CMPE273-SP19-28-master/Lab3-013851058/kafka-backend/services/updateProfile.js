var User = require('../../Backend/model/User');

//Update Profile
function handle_request(message, callback){
    console.log('update-profile. Message ', message);

    User.findOne({
        name : message.name
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {
            console.log('UserProfile', user);

            user.name = message.name;
            user.email = message.email;
            user.phoneNumber = message.phoneNumber;
            user.about = message.about;
            user.city = message.city;
            user.country = message.country;
            user.company = message.company; 
            user.school = message.school;
            user.hometown = message.hometown;
            user.languages = message.languages;
            user.gender = message.gender;
            
            user.save().then((doc) => {

                console.log("User details Updated successfully.", doc);
                callback(null, doc);

            }, (err) => {
                console.log("Unable to save user details.", err);
                callback(err, null);
            });
        }
    });
}

exports.handle_request = handle_request;