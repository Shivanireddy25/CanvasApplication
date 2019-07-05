var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.post('/quiz', requireAuth, function (req, res) {

    console.log('Inside Create Quiz POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("createQuiz", req.body, function(err, result){
            if(err){
                console.log("Error in creating Quiz.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Quiz created successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Quiz Created');
            }
        });
    
});

module.exports = router;