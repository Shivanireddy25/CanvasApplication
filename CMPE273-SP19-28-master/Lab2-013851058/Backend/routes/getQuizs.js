var express = require('express');
var router = express.Router();
//Passport authentication

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.post('/getQuiz', requireAuth, function (req, res) {

    console.log('Inside Fetch Quizs POST!');
    console.log('Request Body: ', req.body);
    

        kafka.make_request("getQuizs", req.body, function(err, result){
            if(err){
                console.log("Error in fetching Quizs.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Quizs fetched successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;