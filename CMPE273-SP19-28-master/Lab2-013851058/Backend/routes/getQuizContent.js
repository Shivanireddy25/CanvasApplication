var express = require('express');
var router = express.Router();

var passport = require('passport');
var jwt = require('jsonwebtoken');

var requireAuth = passport.authenticate('jwt', {session: false});

var kafka = require('../kafka/client');


router.get('/getQuizContent/:id', requireAuth, function (req, res) {

    console.log('Inside Get Quiz POST!');
    console.log('Request Body: ', req.params);
    

        kafka.make_request("getQuizContent", req.params, function(err, result){
            if(err){
                console.log("Error in fetching Quiz Content.", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Quiz Content fetched successfully.", result);
                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(result));
            }
        });
    
});

module.exports = router;

