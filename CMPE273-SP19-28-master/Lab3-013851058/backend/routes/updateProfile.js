var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');

//update profile
router.post('/updateProfile', requireAuth, function (req, res) {

   console.log("Update profile");
    console.log('Request Body: ', req.body);
    
        kafka.make_request("updateProfile", req.body, function(err, result){
            if(err){
                console.log("Error in updating User.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("User updated successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;