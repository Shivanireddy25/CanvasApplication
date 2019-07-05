var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');

router.post('/createSubmission', requireAuth, function (req, res) {

    console.log('Inside Create Submission POST!');
    console.log('Request Body: ', req.body);
   
    console.log(req.session.user);

        kafka.make_request("createSubmissions", req.body, function(err, result){
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
                res.end('Submissions created');
            }
        });
    
});

module.exports = router;