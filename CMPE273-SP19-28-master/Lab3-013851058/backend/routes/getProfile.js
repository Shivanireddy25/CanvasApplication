var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.post('/profile', requireAuth, function (req, res) {

    console.log('Inside Fetch Profile POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("getProfile", req.body, function(err, result){
            if(err){
                console.log("Error in fetching Profile.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Profile fetched successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;