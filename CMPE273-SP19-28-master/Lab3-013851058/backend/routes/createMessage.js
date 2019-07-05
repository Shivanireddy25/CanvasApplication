var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');

router.post('/messages', requireAuth, function (req, res) {

    console.log('Inside Create Message POST!');
    console.log('Request Body: ', req.body);
   
    

        kafka.make_request("createMessage", req.body, function(err, result){
            if(err){
                console.log("Error ", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Success", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Message created');
            }
        });
    
});

module.exports = router;


